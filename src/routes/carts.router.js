import express from "express";
import path from "path";
import { cartsFileManager } from "../fileManager/carts.manager.js";
import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";

const router = express.Router();

let carts = [];
let products = [
    //{ id: 1, title: "", decription: "", code: "", price: "", status: true, stock: "", category: "", thumbnails: [] }
];

// GET /api/carts - Listar carritos

router.get("/api/carts", async (req, res) => {
    const carts = await cartModel.find();
    res.send({ status: "success", payload: carts });

    // const carts = await cartsFileManager.readFile();
    // res.json(carts);
});

// POST /api/carts - Agregar carrito

// router.post("/api/carts", async (req, res) => {
//     const carts = await cartsFileManager.readFile();
//     //const { cart } = req.body;
//     const newCart = {
//         id: carts.length + 1,
//         products: [
//             {
//                 id: products.length + 1, quantity: 1
//             }
//         ]
//     }
//     carts.push(newCart);
//     await cartsFileManager.writeFile(carts);
//     res.status(201).json(`Carrito con el id ${newCart.id} agregado correctamente`);
// });

// GET /api/carts/:cid - Obtener carrito por id y listar productos

router.get("/api/carts/:cid", async (req, res) => {

    const { cid } = req.params;
    try {
        let cart = await cartModel.findOne({ _id: cid });
        res.send({ status: "success", payload: cart });
    } catch (error) {
        res.send({ status: "error", payload: "El carrito no existe" });
    }



});

// PUT /api/carts/:cid - Actualizar carrito por id

router.put("/api/carts/:cid", async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;

    try {
        const cart = await cartModel.findOne({ _id: cid });

        cart.products = products.map(product => ({
            product: product.product,
            quantity: product.quantity || 1 // Si no se proporciona la cantidad, se asume 1
        }));

        // Guardar los cambios en la base de datos
        let result = await cart.save();

        res.send({ status: "success", payload: result });


    } catch (error) {
        res.send({ status: "error", payload: "El carrito no existe" });
    }
});


// PUT /api/carts/:cid/products/:pid - Actualizar producto(s) en carrito por id

router.put('/api/carts/:cid/products/:pid', async (req, res) => {

    const { cid, pid } = req.params;
    const { quantity } = req.body;
    console.log("Cantidad: ", quantity);

    try {

        let cart = await cartModel.findOne({ _id: cid }); //.populate("carts.cart");
        console.log("Carrito Encontrado: ");
        //console.log(cart.products);


        if (!cart) {
            return res.send({ status: "error", payload: "El carrito no existe" });
        }

        // Buscar el producto en el carrito
        const productIndex = cart.products.findIndex(item => item.product && item.product.toString() === pid);
        console.log("Indice Producto en carrito: ", productIndex)


        // Verifico si el producto ya existe en el carrito
        if (productIndex === -1) {
            res.send({ status: "error", payload: "El producto no está en el carrito" });

        }

        // Actualizar cantidad del producto
        cart.products[productIndex].quantity = quantity;

        // Actualizar cambios en base de datos
        let result = await cartModel.updateOne({ _id: cid }, { products: cart.products });

        res.send({ status: "success", payload: result });

    }

    catch (error) {
        return res.send({ status: "error", payload: "El producto no existe" });
    }

});

// Crear carrito en Mongo

router.post("/api/carts", async (req, res) => {
    let { first_name = "Cecilia", last_name = "Trump", email = "ctrump@mail.com" } = req.body;
    if (!first_name || !last_name || !email) {
        res.send({ status: "error", payload: "Faltan parámetros obligatorios" });
    }

    let result = await cartModel.create({
        first_name,
        last_name,
        email,
        products: [

        ]
        ,
        timestamp: new Date()
    });

    res.send({ status: "success", payload: result });

});

// DELETE /api/carts/:cid/products/:pid - Eliminar producto de carrito por id

router.delete("/api/carts/:cid/products/:pid", async (req, res) => {

    const { cid, pid } = req.params;

    try {

        const cart = await cartModel.findOne({ _id: cid });
        console.log("Carrito Encontrado");
        const cartProduct = await cart.products.findIndex(item => item.product.toString() === pid);
        console.log(cartProduct)



        const cartUpdated = await cart.products.splice(cartProduct, 1);
        console.log("Producto Eliminado del Carrito = ", cartUpdated);
        let result = await cartModel.updateOne({ _id: cid }, { products: cart.products });
        res.send({ status: "success", message: "Producto Eliminado", payload: result });



    } catch (error) {
        res.send({ status: "error", payload: "El producto no existe" });
    }
}
);


// DELETE /api/carts/:cid - Eliminar todos los productos del carrito (id)

router.delete("/api/carts/:cid", async (req, res) => {
    const { cid } = req.params;

    try {
        let cart = await cartModel.findOne({ _id: cid });

        if (cart.products.length === 0) {
            return res.send({ status: "error", payload: "El carrito no tiene productos" });
        }

        cart.products = [];
        let result = await cartModel.updateOne({ _id: cid }, { products: cart.products });
        res.send({ status: "success", payload: result, message: "Carrito vaciado" });
    }
    catch (error) {
        res.send({ status: "error", payload: "El carrito no existe" });
    }

});






export default router;

