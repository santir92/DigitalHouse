const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

//esta variable nos muestra donde se encuntra la data de las actividades

const actividadesFilePath = path.join(__dirname, '../database/actividades.json');
const actividades = JSON.parse(fs.readFileSync(actividadesFilePath, 'utf-8'));

const controller = {

activities: (req, res) => {
    //vista con todas las actividades
    res.render('activities', {actividades})
},

detalle: (req, res) => {
    //vista con detalle actividad
    let nombreActividad = req.params.nombre;

    let actividadParticular = null;

    for (let o of actividades) {
        if (o.nombre==nombreActividad){
            actividadParticular=o;
            break
        }
    }
    if (actividadParticular != null){ 

    res.render('detalle', {actividadParticular: actividadParticular})

    res.send('Actividad no encontrada.');
}},

//crear actividad

create: (req, res) => {
    res.render('form-crear-actividad')
},
store: (req, res) => {
    let datos = req.body;
    let imagen=req.file;

    let nuevaActividad = {
        "nombre": actividades.nombre,
        "imgPrincipial": imagen.filename,
        "precio": actividades.precio,
        "participantes": actividades.participantes,
        "categoria": actividades.categoria,
        "descripcion": actividades.descripcion   
    }


    //los valores que tomamos del formulario lo enviamos a actividades para guardarlo de manera logica
    actividades.push(datos);
    // y aca lo guardamos de manera fisica
	fs.writeFileSync(actividadesFilePath,JSON.stringify(actividades, null, " "),'utf-8');
    // una vez agregado el producto volvemos a una vista en este caso el home
	res.redirect('/');
},

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


delete: (req, res) =>{
    let actividadEliminada = req.params.nombre;

    nuevaListaActividades = actividades.filter ((e) =>  e.nombre != actividadEliminada)
    
    fs.writeFileSync(
        actividadesFilePath,
        JSON.stringify(nuevaListaActividades , null, " "),
        {
            encoding: "utf-8",
        }
    );
    res.redirect('/')
}
};






module.exports = controller;