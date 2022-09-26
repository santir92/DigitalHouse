const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller')


router.get("/", controller.home)

//vista del restaurante
//router.get('/restaurante', controller.restaurante);

router.get("/register", controller.register );

router.get('/login', controller.login);

module.exports = router;