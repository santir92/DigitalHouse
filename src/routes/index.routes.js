const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller')


router.get("/", controller.home)
//router.get('/:actividad', controller.actividad);

router.get("/register", controller.register );

router.get('/login', controller.login);

module.exports = router;