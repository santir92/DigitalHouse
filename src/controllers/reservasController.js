const fs = require('fs');
const path = require('path');



const controller = {

carrito: (req, res) => {
    res.render('carrito');
},
    
update: (req, res) => {
	res.render('form-actualizar-actividad')
}

}
module.exports = controller;