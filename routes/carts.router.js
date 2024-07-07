const express = require("express");
const router = express.Router();

const carts = [];

// GET /api/carts

router.get("/api/carts", (req, res) => {
    res.json(carts);
});

// POST /api/carts

// router.post("/api/carts", (req, res) => {
//     const cart = req.body;
//     carts.push(cart);
//     res.json({ message: "Carrito Agregado" });
// });

module.exports = router;

