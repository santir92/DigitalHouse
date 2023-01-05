const ejs = require('ejs');
const db = require('../../database/models');
const {validationResult} = require('express-validator');

const APIcontroller = {

    verAPI: (req, res) => {
        db.Persona.findAll()
        .then(function (respuesta){
            res.status(200).json({
                total: respuesta.length,
                data: respuesta,
                status: 200
            })
        })
    },

    users: (req, res) => {
        db.Persona.findAll()
        .then(function (respuesta){
            res.json({
                count: respuesta.length,
                users: respuesta,
            })
        })
    },
    particular: (req, res) => {
        db.Persona.findByPk(req.params.id)
        .then(function (respuesta){
            res.json({
                Nombre: respuesta.nombre,
                Email: respuesta.email,
                Usario: respuesta.username,
            })
        })
    },
    actividades: (req, res) => {
        db.Actividad.findAll()
        .then(function (respuesta){
            res.json({
                count: respuesta.length,
                products: respuesta
  
            })
        })
    },
    
}

module.exports = APIcontroller;