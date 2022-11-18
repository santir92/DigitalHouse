const fs = require('fs');
const path = require('path');



const controller = {

reserva: (req, res) => {
    res.render('reserva');
},
    
update: (req, res) => {
	res.render('form-actualizar-actividad')
}

}
module.exports = controller;