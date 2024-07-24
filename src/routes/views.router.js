import express from 'express';

const router = express.Router();


// Ruta Websocket

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
})

export default router;