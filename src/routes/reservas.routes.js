const express = require('express');
const router = express.Router();
const controller = require('../controllers/reservasController')

router.get('/', controller.carrito);

// actualizar una reserva
router.get('/update', controller.update)

module.exports = router;