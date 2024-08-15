import express from "express";
import path from "path";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import handlebars from 'express-handlebars';
import exphbs from 'express-handlebars';
import { Server } from 'socket.io';
import http from 'http';
import __dirname from "./utils.js"; // __dirname con ES modules
import { prodFileManager } from "./fileManager/products.manager.js";
import viewsRouter from "./routes/views.router.js";
import mongoose from "mongoose";


const app = express();
const httpServer = http.createServer(app);
export const socketServer = new Server(httpServer);
const PORT = 8080;

// Instanciar el servidor

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a la base de datos MongoDB
const enviroment = async () => {
    await mongoose.connect(
        "mongodb+srv://joamilibarra:oK4kAi1laK4MdSwY@coder70065.llnur.mongodb.net/carrito?retryWrites=true&w=majority&appName=Coder70065")

        .then(() => {
            console.log("Conectado a la base de datos MongoDB");
        })
        .catch((error) => {
            console.log("Error al conectar a la base de datos MongoDB", error);
        });
};
enviroment();

// Configuración de Handlebars
const hbs = exphbs.create({
    helpers: {
        gt: (a, b) => a > b,
        lt: (a, b) => a < b,
        add: (a, b) => a + b,
        subtract: (a, b) => a - b
    },
    extname: '.handlebars',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')) // TODO

app.use(express.static(path.join(__dirname, "public")));

// Rutas
app.use("/", viewsRouter);
app.use("/api", productsRouter);
app.use("/api", cartsRouter);


// Ruta realtimeproducts
app.get('/', async (req, res) => {

    res.render('realTimeProducts');
})

// app.get('/', async (req, res) => {

//     res.render('index');
// })

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
