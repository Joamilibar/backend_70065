import express from 'express';

const router = express.Router();


// Ruta Websocket

router.get('/', (req, res) => {
    res.render('index', {});
})

export default router;