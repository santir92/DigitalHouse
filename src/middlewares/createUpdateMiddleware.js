const {body} = require('express-validator');
const path = require('path');

const validacionesCrear = [
    body('nombre').notEmpty().withMessage('Debes escribir un nombre'),
    body('valor').notEmpty().withMessage('Debes incluir el valor').bail()
    .isNumeric().withMessage('Solo se admiten numeros'),
    body('participantes').notEmpty().withMessage('Debes ingresar la cantidad de participantes').bail()
    .isNumeric().withMessage('Solo se admiten numeros'),
    body('categoria').notEmpty().withMessage('Debes escoger una categoria'),
    body('imgPrincipal').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.jpeg', '.gif'];
        if(!file){
            throw new Error ('Tienes que subir una imagen');
        }else{
            let fileExtension = path.extname(file.originalname);
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error (`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    })
];

module.exports = validacionesCrear;