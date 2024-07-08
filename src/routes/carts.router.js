const express = require("express");
const router = express.Router();


let carts = [];

// GET /api/carts - Listar carritos

router.get("/api/carts", (req, res) => {
    res.json(carts);
});

// POST /api/carts - Agregar carrito

router.post("/api/carts", (req, res) => {
    const cart = req.body;
    const newCart = {
        id: carts.length + 1,
        products: [
            { id: 1, title: "", decription: "", code: "", price: "", status: true, stock: "", category: "", thumbnails: [] },
        ]
    }
    carts.push(newCart);
    res.status(201).json(`Carrito con el id ${newCart.id} agregado correctamente`);
});

module.exports = router;

