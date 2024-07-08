const express = require("express");
const router = express.Router();

let products = [
    { id: 1, title: "", decription: "", code: "", price: "", status: true, stock: "", category: "", thumbnails: [] },
    { id: 2, title: "", decription: "", code: "", price: "", status: true, stock: "", category: "", thumbnails: [] },
    // { id: 3, title: "", decription: "", code: "", price: "", status: true, stock: "", category: "", thumbnails: [] },
    // { id: 4, title: "", decription: "", code: "", price: "", status: true, stock: "", category: "", thumbnails: [] },
    // { id: 5, title: "", decription: "", code: "", price: "", status: true, stock: "", category: "", thumbnails: [] },
];

// GET /api/products - Listar Productos

router.get("/api/products", (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : products.length;
    res.json(products.slice(0, limit));
});

// GET /api/products/:id - Obtener producto por id

router.get("/api/products/:pid", (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = products.find(product => product.id === productId);
    if (productId) {
        res.json(product);
    } else {
        res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(product);
});


// POST /api/products - Agregar producto

router.post("/api/products", (req, res) => {
    const { title, description, code, price, status = true, stock, category, thumbnails = [] } = req.body;

    // Validación de campos obligatorios

    if (!title || !description || !code || !price || !stock || !category) {
        res.status(400).json({ message: "Faltan campos obligatorios (thumbnails único campo no obligatorio)" });
    } else {

        const newProduct = {
            id: products.length + 1,
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
        res.json(201).json(newProduct);

    };
});


// PUT/:pid - Actualizar producto por id

router.put("/api/products/:pid", (req, res) => {
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
        res.json(product);
    } else {
        res.status(404).json({ message: "Producto no actualizado" });
    }
});


// DELETE /api/products/:pid - Eliminar producto por id

router.delete('/api/products/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);

    products = products.filter((product) => product.id !== productId);
    res.json({ message: `Producto con el id ${productId} eliminado correctamente` });

}

)


module.exports = router;