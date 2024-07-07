const express = require("express");
const router = express.Router();

const products = [
    { id: 1, item: "Sábana Encimera", cantidad: 22 },
    { id: 2, item: "Cubreplumón Lino Stone", cantidad: 10 },
    { id: 3, item: "Almohada Duvet Premium", cantidad: 5 },
];

// GET /api/products = Listar Productos

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


// POST /api/products

// router.post("/api/products", (req, res) => {
//     const product = req.body;
//     newProduct = { id: products.length + 1, item: item, cantidad: cantidad || "17" };
//     products.push(newProduct);
//     res.json(201).json(newProduct);
// });

module.exports = router;