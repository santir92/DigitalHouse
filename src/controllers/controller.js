const fs = require('fs')
const path = require('path')

const actividades = JSON.parse(fs.readFileSync(path.join(__dirname, '../database/actividades.json'))) 

const controller = {
    home: (req, res) => {
        res.render('home')
    },

    actividad: (req, res) => {
        let act = req.params.actividad
        // console.log(act)
        for (i = 0; i < actividades.length; i++){
            if (actividades[i].nombre == act)
                res.render('actividadDetalle', {actividadParticular: actividades[i]})
        }
    },
   
    register: (req, res) => {
        res.render('registro');
    },
    login: (req, res) => {
        res.render('login')
    },

}
module.exports = controller;