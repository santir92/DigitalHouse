const fs = require('fs');
const path = require('path');

//esta variable nos muestra donde se encuntra la data de las actividades

const actividadesFilePath = path.join(__dirname, '../database/actividades.json');
const actividades = JSON.parse(fs.readFileSync(actividadesFilePath, 'utf-8'));

const controller = {

activities: (req, res) => {
    //vista con todas las actividades
    res.render('activities', {actividades})
},

//crear actividad

create: (req, res) => {
    res.render('form-crear-actividad')
},
store: (req, res) => {
    let datos = req.body;
    

    //los valores que tomamos del formulario lo enviamos a actividades para guardarlo de manera logica
    actividades.push(datos);
    // y aca lo guardamos de manera fisica
	fs.writeFileSync(actividadesFilePath,JSON.stringify(actividades, null, " "),'utf-8');
    // una vez agregado el producto volvemos a una vista en este caso el home
	res.redirect('/');
},

update: (req, res) => {
	res.render('form-actualizar-actividad')
}

/* actualizar: (req, res) =>{
let idActividad = req.params.id;
let datos = req.body;

for (let o of actividades){
    if (o.id == idActividad){
        o.nombre = datos.nombre;
        o.precio = parseInt(datos.precio);
        o.participantes = parseInt(datos.participantes);
		o.categoria = datos.categoria;
		o.descripcion = datos.descripcion;
		o.image = datos.image;
        break;
    }
}}
)
fs.writeFileSync(productsFilePath,JSON.stringify(nuevaLista, null, " "),'utf-8');
res.redirect('/');


delete: (req, res) =>{
    let idActividad = req.params.id;
    let nuevaLista = actividades.filter (function(e){
        return e.id != idActividad;
    })
})

fs.writeFileSync(productsFilePath,JSON.stringify(nuevaLista, null, " "),'utf-8');
res.redirect('/');
*/

}
module.exports = controller;