import express from 'express';
import { prodFileManager } from '../fileManager/products.manager.js';
import __dirname from "../utils.js";

const router = express.Router();


// Ruta Websocket realTimeProducts

router.get('/realtimeproducts', async (req, res) => {
    try {
        const realTimeProducts = prodFileManager.readFile();
        res.render('realTimeProducts', { title: 'Lista de Productos en tiempo real', realTimeProducts });
    } catch (error) {
        res.status(500).send('Error al obtener los productos en tiempo real');
        //        res.render('realTimeProducts');
    }
})



// GET /products - Mostrar productos en vista

router.get('/products', async (req, res) => {
    try {
        const products = await prodFileManager.readFile();
        res.render('index', { title: 'Lista de Productos', products });
    } catch (error) {
        res.status(500).send('Error al obtener los productos');
    }
});


export default router;