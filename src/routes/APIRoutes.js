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

module.exports = router