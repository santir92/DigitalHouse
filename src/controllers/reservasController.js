const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const actividadesFilePath = path.join(__dirname, '../database/actividades.json');
const actividades = JSON.parse(fs.readFileSync(actividadesFilePath, 'utf-8'));


const controller = {

reserva: (req, res) => {
    const actividades = JSON.parse(fs.readFileSync(actividadesFilePath, 'utf-8'));
    //vista con todas las actividades
    res.render('reserva', {actividades})
},
    
update: (req, res) => {
	res.render('form-actualizar-actividad')
}

}
module.exports = controller;