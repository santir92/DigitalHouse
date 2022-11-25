const express = require('express');
const router = express.Router();
//controlador
const controller = require('../controllers/actividadesController')
//Middleware
const uploadFile = require('../middlewares/multerActividadesMiddlewares');

// ver todas las actividades
router.get('/', controller.activities)

// ver detalle actividad
router.get('/detalle/:nombre', controller.detalle)

//crear una nueva actividad
router.get('/create', controller.create)
router.post('/create', uploadFile.single('imgPrincipal'),controller.store)


//actualizar actividad
router.get('/update/:nombre', controller.update);
router.put("/update/:nombre", uploadFile.single('imgPrincipal'), controller.actualizar);


//eliminar actividad
router.delete("/update/:nombre", controller.delete);



module.exports = router;