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
    }else{
        res.send('Actividad no encontrada.');
    }
},

//crear actividad

create: (req, res) => {
    res.render('form-crear-actividad')
},
store: (req, res) => {
    let datos = req.body;
    let imagen=req.file;

    let nuevaActividad = {
        "nombre": datos.nombre,
        "imgPrincipal": imagen.filename,
        "precio": datos.precio,
        "participantes": datos.participantes,
        "categoria": datos.categoria,
        "descripcion": datos.descripcion   
    }


    //los valores que tomamos del formulario lo enviamos a actividades para guardarlo de manera logica
    actividades.push(nuevaActividad);
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
    }else{
        res.send('Actividad no encontrada.');
    }
},

 actualizar: (req, res) =>{
let nombreActividad = req.params.nombre;
let datos = req.body;
let nombreImagenAntigua="";

for (let o of actividades){
    if (o.nombre== nombreActividad){

        nombreImagenAntigua = o.imgPrincipal;

        o.nombre = datos.nombre;
        o.precio = parseInt(datos.precio);
        o.participantes = parseInt(datos.participantes);
		o.categoria = datos.categoria;
		o.descripcion = datos.descripcion;
		o.imgPrincipal = req.file.filename;
        break;
        
    }
}


fs.writeFileSync(actividadesFilePath,JSON.stringify(actividades, null, " "),'utf-8');
// el metodo unlinkSync elimina la imagen/archivo que le pasamos en la ruta en este caso la foto anterior que estaba cargada
fs.unlinkSync(__dirname+'/../../public/images/actividades/'+nombreImagenAntigua);

res.redirect('/')},


delete: (req, res) =>{
    let actividadEliminada = req.params.nombre;

    let nombreImagenAntigua="";

    for (let a of actividades){
        if (a.nombre == actividadEliminada){
            nombreImagenAntigua = a.imgPrincipal;
        }
    }

    let nuevaListaActividades = actividades.filter (function(e){
        return e.nombre != actividadEliminada;
    })
    
    //sobre escribir archivo de manera fisica
    fs.writeFileSync(actividadesFilePath,JSON.stringify(nuevaListaActividades, null, " "),'utf-8');
    // el metodo unlinkSync elimina la imagen/archivo que le pasamos en la ruta en este caso la foto anterior que estaba cargada
    fs.unlinkSync(__dirname+'/../../public/images/actividades/'+nombreImagenAntigua);

    res.redirect('/')
}
};






module.exports = controller;