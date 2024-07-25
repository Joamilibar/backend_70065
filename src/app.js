import express from "express";
import path from "path";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import http from 'http';
import __dirname from "./utils.js"; // __dirname con ES modules
import { prodFileManager } from "./fileManager/products.manager.js";
import viewsRouter from "./routes/views.router.js";




const app = express();
const httpServer = http.createServer(app);
export const socketServer = new Server(httpServer);
const PORT = 8080;

// Instanciar el servidor

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar handlebars para leer el contenido de los endpoints
app.engine('handlebars', handlebars.engine({
    //defaultLayout: 'main', // Se establece main.handlebars por defecto
}));
app.set('views', __dirname + '/views') // TODO
app.set('view engine', 'handlebars')


app.use(express.static(path.join(__dirname, "public")));

// Rutas
app.use("/", productsRouter);
app.use("/", cartsRouter);
app.use("/", viewsRouter);


// Ruta vista principal
// app.get("/", (req, res) => {

//     //res.sendFile(path.join(__dirname, "views", "index.handlebars"));
//     res.render('index');
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// Ruta realtimeproducts
app.get('/', (req, res) => {

    res.render('realTimeProducts');
})


let messages = [];

// Escuchar eventos de conexión
socketServer.on('connection', async socket => {
    console.log('Nueva Conexión:', socket.id);


    // Listar productos en tiempo real
    const products = await prodFileManager.readFile();
    socketServer.emit('productUpdate', products);


    // Agregando nuevo producto
    socket.on('addProduct', async (newProduct) => {
        const products = await prodFileManager.readFile();
        products.push(newProduct);
        await prodFileManager.writeFile(products);

        // Actualizando para todos los clientes
        socketServer.emit('productUpdate', products);
    });

    socket.on('deleteProduct', async (productId) => {
        console.log('Eliminar producto con id', productId);

        // Eliminando producto de lista
        let products = await prodFileManager.readFile();
        products = products.filter(product => product.id !== parseInt(productId));
        await prodFileManager.writeFile(products);
        socketServer.emit('productDeleted', productId);
        socketServer.emit('updateProducts', products);

        // Actualizando para todos los clientes
        socketServer.emit('productUpdate', products);
    });



    socket.on('message', (data) => {
        messages.push(data);
        socketServer.emit('message', data);
        console.log(data);
    });


    socket.on('connect', () => {
        console.log('Conectado al servidor');
    });

    socket.on('connect_error', (error) => {
        console.error('Error de conexión:', error);
    });
});

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
