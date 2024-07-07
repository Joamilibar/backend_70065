const express = require("express");
const router = express.Router();

const products = [];

// GET /api/products

router.get("/api/products", (req, res) => {
    res.json(products);
});

// POST /api/products

router.post("/api/products", (req, res) => {
    const product = req.body;
    products.push(product);
    res.json({ message: "Producto Agregado" });
});

module.exports = router;