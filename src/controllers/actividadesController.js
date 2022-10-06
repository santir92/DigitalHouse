const fs = require('fs');
const path = require('path');

//esta variable nos muestra donde se encuntra la data de las actividades
const actividades = JSON.parse(fs.readFileSync(path.join(__dirname, '../database/actividades.json'), 'utf-8')) 

const controller = {

activities: (req, res) => {
    //vista con todas las actividades
    res.render('activities', {actividades})
},

detalle: (req, res) => {
    //vista con detalle actividad
    let nombreActividad = req.params.nombre;

    let actividadBuscada = null;

    for (let o of actividades) {
        if (o.nombre==nombreActividad){
            actividadBuscada=o;
            break
        }
    }
    if (actividadBuscada != null){

    res.render('detalle', {actividadBuscada: actividades})

    res.send('Actividad no encontrada.');
}},

create: (req, res) => {
    res.render('form-crear-actividad')
},
/*store: (req, res) => {
    let datos = req.body;

    let idNuevoProducto = (products[products.length-1].id)+1;
	let imagenNuevoProducto = 'qqqqq.jpg';

	let nuevoProducto ={
		"id": idNuevoProducto,
		"nombre": datos.nombre,
		"precio": parseInt(datos.precio),
		"participantes": parseInt(datos.participantes),
		"categoria": datos.categoria,
		"descripcion": datos.descripcion,
		"image": imagenNuevoProducto
	};

    //los valores que tomamos del formulario lo enviamos a products para guardarlo de manera logica
    products.push(nuevoProducto);
    // y aca lo guardamos de manera fisica
	fs.writeFileSync(productsFilePath,JSON.stringify(products, null, " "),'utf-8');
    // una vez agregado el producto volvemos a una vista en este caso el home
	res.redirect('/');
},*/

update: (req, res) => {
    let nombreActividad = req.params.nombre;

    let actividadBuscada = null;

    for (let o of actividades) {
        if (o.nombre==nombreActividad){
            actividadBuscada=o;
            break
        }
    }
    if (actividadBuscada != null){
        res.render ("form-actualizar-actividad.ejs", {actividades:actividadBuscada})
    }
	res.send('Actividad no encontrada.');
},

 actualizar: (req, res) =>{
let nombreActividad = req.params.nombre;
let datos = req.body;

for (let o of actividades){
    if (o.nombre== nombreActividad){
        o.nombre = datos.nombre;
        o.precio = parseInt(datos.precio);
        o.participantes = parseInt(datos.participantes);
		o.categoria = datos.categoria;
		o.descripcion = datos.descripcion;
		o.image = datos.image;
        break;
        
    }
}


fs.writeFileSync((path.join(__dirname, '../database/actividades.json')),JSON.stringify(actividades, null, " "),'utf-8');

res.redirect('/')},

};



/*delete: (req, res) =>{
    let idActividad = req.params.id;
    let nuevaLista = actividades.filter (function(e){
        return e.id != idActividad;
    })
})

fs.writeFileSync(productsFilePath,JSON.stringify(nuevaLista, null, " "),'utf-8');
res.redirect('/');
*/


module.exports = controller;