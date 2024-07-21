const express = require("express");
const router = express.Router();
const path = require("path");
const { prodFileManager } = require("../fileManager/products.manager");


//const prodFilePath = path.join(__dirname, "../data/products.json");

let products = [
    //{ id: 1, title: "", decription: "", code: "", price: "", status: true, stock: "", category: "", thumbnails: [] },
    //{ id: 2, title: "", decription: "", code: "", price: "", status: true, stock: "", category: "", thumbnails: [] },

];

// GET /api/products - Listar Productos

router.get("/api/products", async (req, res) => {
    const products = await prodFileManager.readFile();
    const limit = req.query.limit ? parseInt(req.query.limit) : products.length;
    res.json(products);
});;

// GET /api/products/:id - Obtener producto por id

router.get("/api/products/:pid", async (req, res) => {
    const products = await prodFileManager.readFile();
    const productId = parseInt(req.params.pid);
    const product = products.find(product => product.id === productId);
    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json({ message: "Producto no encontrado" });
    }


});


// POST /api/products - Agregar producto

router.post("/api/products", async (req, res) => {
    const { title, description, code, price, status = true, stock, category, thumbnails = [] } = req.body;
    const products = await prodFileManager.readFile();
    // Validación de campos obligatorios

    if (!title || !description || !code || !price || !stock || !category) {
        res.status(400).json({ message: "Faltan campos obligatorios (thumbnails único campo no obligatorio)" });
    } else {

        const newProduct = {
            id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
            title,
            description,
            code,
            price,
            status: true,
            stock,
            category,
            thumbnails: []
        };

        products.push(newProduct);
        await prodFileManager.writeFile(products);
        res.status(201).json(newProduct);

    };
});


// PUT/:pid - Actualizar producto por id

router.put("/api/products/:pid", async (req, res) => {
    const products = await prodFileManager.readFile();
    const productId = parseInt(req.params.pid);
    const product = products.find(product => product.id === productId);
    if (product) {

        const { title, description, code, price, status, stock, category, thumbnails } = req.body;
        product.title = title;
        product.description = description;
        product.code = code;
        product.price = price;
        product.status = status;
        product.stock = stock;
        product.category = category;
        product.thumbnails = thumbnails;
        await prodFileManager.writeFile(products);
        res.status(201).json(product);
    } else {
        res.status(404).json({ message: "Producto no actualizado" });
    }
});


// DELETE /api/products/:pid - Eliminar producto por id

router.delete('/api/products/:pid', async (req, res) => {

    try {
        let products = await prodFileManager.readFile();
        const productId = parseInt(req.params.pid);

        const updatedProducts = products.filter((product) => product.id !== productId);

        if (!updatedProducts) {
            res.status(404).json({ message: "Producto no encontrado" });
        } else {
            products.splice(updatedProducts - 1, 1);
            await prodFileManager.writeFile(updatedProducts);
            res.json({ message: `Producto con el id ${productId} eliminado correctamente` });

        }
    } catch (error) {
        res.status(404).json({ message: "Producto no encontrado" });
    }
});




module.exports = router;