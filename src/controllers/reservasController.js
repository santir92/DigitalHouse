const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const db = require('../../database/models');

const actividadesFilePath = path.join(__dirname, '../database/actividades.json');
const actividades = JSON.parse(fs.readFileSync(actividadesFilePath, 'utf-8'));


const controller = {

reserva: (req, res) => {
    // const actividades = JSON.parse(fs.readFileSync(actividadesFilePath, 'utf-8'));
    //vista con todas las actividades
    db.Actividad.findAll({include:[{association:'tipo'}]})
    .then((actividades)=>{
        let listaActividades = [];

        for(a of actividades){
            listaActividades.push( {
                nombre: a.nombre,
                participantes: a.tipo.cantidad_maxima,
                valor: a.tipo.valor,
                imagen:a.tipo.imagen,
                descripcion: a.tipo.descripcion
            });
        }
        // const actividades = JSON.parse(fs.readFileSync(actividadesFilePath, 'utf-8'));
  

        res.render('reserva', {actividades: listaActividades})

        db.Reserva.create({
            fecha_reserva: 'p',
            cantidad_personas: 2,
            horario: 2,
            persona_id: 2
        })
    })
},
    
update: (req, res) => {

	res.render('form-actualizar-actividad')
    db.Reserva.create({
        fecha_reserva: 'p_update',
        cantidad_personas: 4,
        horario: 4,
        persona_id: 4
    },
    {
        where:{
            id: 1
        }

    })
}

}
module.exports = controller;
