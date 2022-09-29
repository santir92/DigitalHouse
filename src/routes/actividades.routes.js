const express = require('express');
const router = express.Router();
const controller = require('../controllers/actividadesController')




//crear una nueva actividad
router.get('/create', controller.create)
//router.post('/create', controller.store)

//actualizar actividad
router.get('/update', controller.update);
//router.put("/:id/actualizar", controller.actualizar);

//eliminar actividad
//router.delete("/:id/delete", controller.delete);



module.exports = router;