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

// Dashboard

router.get('/totalusuarios', APIcontroller.totalUsuarios) 

router.get('/totalproductos', APIcontroller.totalProductos) 

router.get('/ultimoUsuario', APIcontroller.ultimoUsuario) 

router.get('/ultimoProducto', APIcontroller.ultimoProducto) 

router.get('/categorias', APIcontroller.Categorias) 

module.exports = router