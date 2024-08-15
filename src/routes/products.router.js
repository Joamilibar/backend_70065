import express from "express";  // const path = require("path");
// import path from "path";    // const { prodFileManager } = require("../fileManager/products.manager");
import { prodFileManager } from "../fileManager/products.manager.js";
// import fs from "fs/promises";
import __dirname from "../utils.js";
import { socketServer } from "../app.js";
import productModel from "../models/product.model.js"; // Importar el modelo de producto
import { error } from "console";
import paginate from "mongoose-paginate-v2";


const apiRouter = express.Router();

//const prodFilePath = path.join(__dirname, "../data/products.json");

let products = [
    //{ id: 1, title: "", decription: "", code: "", price: "", status: true, stock: "", category: "", thumbnails: [] },

];


// GET /api/products - Listar Productos

apiRouter.get("/products", async (req, res) => {
    try {
        let { limit = 10, page = 1, sort, query, category, availability } = req.query;

        const productFilter = {};

        // Filtro por Query General
        if (query) {
            productFilter.$or = [
                { title: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } },
                { code: { $regex: query, $options: "i" } }
            ];

        }

        // Filtro por Categoria

        if (category) {
            productFilter.category = new RegExp(category, 'i');
        }

        // Filtro por Disponibilidad

        if (availability) {
            productFilter.stock = availability === 'available' ? { $gt: 0 } : 0;
        }

        //Paginación y Ordenamiento

        const options = {
            limit: parseInt(limit, 10),
            page: parseInt(page, 1),
            sort: sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {}
        }


        //const { limit = 10, page = 1, sot, query } = req.query;

        let result = await productModel.paginate(productFilter, options,); // Buscamos productos en la base de datos
        console.log(result);
        res.send({ result: "Success", payload: result })
    } catch (error) {
        res.send({ result: "Error", payload: error })
    }

    // const products = await prodFileManager.readFile();
    // const limit = req.query.limit ? parseInt(req.query.limit) : products.length;
    // res.render('index', { title: 'Ĺista de Productos', products });

});;

// GET /api/products/:id - Obtener producto por id

apiRouter.get("/products/:pid", async (req, res) => {


    // const products = await prodFileManager.readFile();
    // const productId = parseInt(req.params.pid);
    // const product = products.find(product => product.id === productId);
    // if (product) {
    //     res.status(200).json(product);
    // } else {
    //     res.status(404).json({ message: "Producto no encontrado" });
    // }


});


// POST /api/products - Agregar producto

apiRouter.post("/products", async (req, res) => {


    const { title, description, code, price, status = true, stock, category, thumbnails = [] } = req.body;
    // const products = await prodFileManager.readFile();

    // Validación de campos obligatorios

    if (!title || !description || !code || !price || !status || !stock || !category) {
        res.send({ status: "error", error: "Faltan Parámetros Obligatorios" });

        // res.status(400).json({ message: "Faltan campos obligatorios (thumbnails único campo no obligatorio)" });
    } // else {

    const result = await productModel.create({
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
    });
    res.send({ result: "Successs", payload: result });

    // const newProduct = {
    //     id: products[products.length - 1].id + 1,
    //     title,
    //     description,
    //     code,
    //     price,
    //     status: true,
    //     stock,
    //     category,
    //     thumbnails: []
    // };

    // products.push(newProduct);
    // await prodFileManager.writeFile(products);

    // Emitir evento de actualización de producto
    socketServer.emit('productUpdate', products);

    //res.status(201).json(newProduct);
});


// PUT/:pid - Actualizar producto por id

apiRouter.put("/products/:pid", async (req, res) => {
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

        // Emitir evento de actualización de producto
        socketServer.emit('productUpdate', products);

        res.status(201).json(product);

    } else {
        res.status(404).json({ message: "Producto no actualizado" });
    }
});


// DELETE /api/products/:pid - Eliminar producto por id

apiRouter.delete('/products/:pid', async (req, res) => {

    try {
        let products = await prodFileManager.readFile();
        const productId = parseInt(req.params.pid);

        const updatedProducts = products.filter((product) => product.id !== productId);

        if (!updatedProducts) {
            res.status(404).json({ message: "Producto no encontrado" });
        } else {
            products.splice(updatedProducts - 1, 1);
            await prodFileManager.writeFile(updatedProducts);

            // Emitir elemento de eliminación de producto
            socketServer.emit('productUpdate', products);


            res.json({ message: `Producto con el id ${productId} eliminado correctamente` });

        }
    } catch (error) {
        res.status(404).json({ message: "Producto no encontrado" });
    }
});






// module.exports = router;

export default apiRouter;