import express from 'express';

const wrouter = express.Router();


// Ruta Websocket

wrouter.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
})

// //GET /realtimeproducts - Mostrar productos en tiempo real
// router.get('/realtimeproducts', async (req, res) => {
//     try {
//         const products = await prodFileManager.readFile();
//         res.render('realTimeProducts', { title: 'Lista de Productos en tiempo real', products });
//     } catch (error) {
//         res.status(500).send('Error al obtener los productos');
//     }
// });

// router.post("/realtimeproducts", async (req, res) => {
//     const { title, description, code, price, status = true, stock, category, thumbnails = [] } = req.body;
//     const products = await prodFileManager.readFile();

//     // Validación de campos obligatorios

//     if (!title || !description || !code || !price || !stock || !category) {
//         res.status(400).json({ message: "Faltan campos obligatorios (thumbnails único campo no obligatorio)" });
//     } else {

//         const newProduct = {
//             id: products[products.length - 1].id + 1,
//             title,
//             description,
//             code,
//             price,
//             status: true,
//             stock,
//             category,
//             thumbnails: []
//         };

//         products.push(newProduct);
//         await prodFileManager.writeFile(products);

//         // Emitir evento de actualización de producto
//         socketServer.emit('productUpdate', products);

//         res.status(201).json(newProduct);
//     };
// });

// // DELETE /api/products/:pid - Eliminar producto por id

// router.delete('/realtimeproducts/:pid', async (req, res) => {

//     try {
//         let products = await prodFileManager.readFile();
//         const productId = parseInt(req.params.pid);

//         const updatedProducts = products.filter((product) => product.id !== productId);

//         if (!updatedProducts) {
//             res.status(404).json({ message: "Producto no encontrado" });
//         } else {
//             products.splice(updatedProducts - 1, 1);
//             await prodFileManager.writeFile(updatedProducts);

//             // Emitir elemento de eliminación de producto
//             socketServer.emit('productUpdate', products);


//             res.json({ message: `Producto con el id ${productId} eliminado correctamente` });

//         }
//     } catch (error) {
//         res.status(404).json({ message: "Producto no encontrado" });
//     }
// });

export default wrouter;