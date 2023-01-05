const express = require('express');
const router = express.Router();
//controlador
const APIcontroller = require('../controllers/APIcontroller')
//Middleware
const uploadFile = require('../middlewares/multerActividadesMiddlewares');
const validacionesCrear = require('../middlewares/createUpdateMiddleware');

// API

router.get('/ver', APIcontroller.verAPI)

router.get('/users', APIcontroller.users)

router.get('/usuario/:id', APIcontroller.particular)

router.get('/actividades', APIcontroller.actividades)

// router.get('/tipo', APIcontroller.tipo)

router.get('/totalCategorias', APIcontroller.totalCategorias)

router.get('/actividad/:id', APIcontroller.particularProduct)

module.exports = router