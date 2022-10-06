const express = require('express');
const router = express.Router();
const controller = require('../controllers/actividadesController')
const multer = require('multer')

const multerDiskStorage = multer.diskStorage({
    destination: function(req, file, cb) { // request, archivo y callback que almacena archivo en destino
     cb(null, path.join(__dirname,'../../public/images/actividades')); // Ruta donde almacenamos el archivo
    },
    filename: function(req, file, cb) { // request, archivo y callback que almacena archivo en destino
     let imageName = Date.now() + path.extname(file.originalname);   // milisegundos y extensión de archivo original
     cb(null, imageName);         
    }
});

const uploadFile = multer ({storage: multerDiskStorage})

// ver todas las actividades
router.get('/', controller.activities)

//crear una nueva actividad
router.get('/create', controller.create)
//router.post('/create', uploadFile.single('cargarImagen'),controller.store)

//actualizar actividad
router.get('/update/:nombre', controller.update);
router.put("/update/:nombre", controller.actualizar);

//eliminar actividad
//router.delete("/:id/delete", controller.delete);



module.exports = router;