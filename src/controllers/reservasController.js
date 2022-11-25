const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const actividadesFilePath = path.join(__dirname, '../database/actividades.json');
const actividades = JSON.parse(fs.readFileSync(actividadesFilePath, 'utf-8'));

const reservaFilePath = path.join(__dirname, '../database/reservas.json');



const controller = {

reserva: (req, res) => {
    const actividades = JSON.parse(fs.readFileSync(actividadesFilePath, 'utf-8'));
    //vista con todas las actividades
    res.render('reserva', {actividades})
},

nuevareserva: (req, res) => {
    let datos = req.body;

    let nuevaReserva = {
        "nombre": datos.nombre,
         
    }

    JSON.parse(fs.readFileSync(reservaFilePath, 'utf-8')).push(nuevaReserva);

    fs.writeFileSync(reservaFilePath,JSON.stringify(JSON.parse(fs.readFileSync(reservaFilePath, 'utf-8')), null, " "),'utf-8');

    res.redirect('/');
},
    
update: (req, res) => {
	res.render('form-actualizar-actividad')
}

}
module.exports = controller;