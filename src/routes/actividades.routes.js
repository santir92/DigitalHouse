const express = require('express');
const router = express.Router();
const controller = require('../controllers/actividadesController')




//crear una nueva actividad
router.get('/create', controller.create)
//router.post('/create', controller.store)

//actualizar actividad
router.get('/update', controller.update)



module.exports = router;