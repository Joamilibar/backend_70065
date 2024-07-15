const express = require("express");
const router = express.Router();
const path = require("path");
const cartsFileManager = require("../fileManager/manager");


let carts = [];
let products = [
    //{ id: 1, title: "", decription: "", code: "", price: "", status: true, stock: "", category: "", thumbnails: [] }
];

// GET /api/carts - Listar carritos

router.get("/api/carts", (req, res) => {
    res.json(carts);
});

// POST /api/carts - Agregar carrito

router.post("/api/carts", (req, res) => {
    //const { cart } = req.body;
    const newCart = {
        id: carts.length + 1,
        products: [
            {
                id: products.length + 1, quantity: 1
            }
        ]
    }
    carts.push(newCart);
    res.status(201).json(`Carrito con el id ${newCart.id} agregado correctamente`);
});

// GET /api/carts/:cid - Obtener carrito por id y listar productos

router.get("/api/carts/:cid", (req, res) => {
    const cartId = parseInt(req.params.cid);
    const cart = carts.find(cart => cart.id === cartId);
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).json({ message: "El carrito no existe" });
    }

});

// POST /api/carts/:cid/products/:pid - Agregar producto a carrito

router.post('/api/carts/:cid/products/:pid', (req, res) => {

    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);

    const cart = carts.find(cart => cart.id === cartId);

    if (!cart) {
        return res.status(404).json({ message: `El carrito con el id ${cartId} no existe` });

    } else {

        const product = products.find(product => product.id === productId);
        cartProduct = cart.products.find(product => product.id === productId);

        if (cartProduct) {
            cartProduct.quantity += 1;
        } else {
            cart.products.push({ id: productId, quantity: 1 });
        }



    } res.status(201).json(cart);

});
module.exports = router;


