const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const db = require('../../database/models');

//esta variable nos muestra donde se encuntra la data de las actividades

// const actividadesFilePath = path.join(__dirname, '../database/actividades.json');
// const actividades = JSON.parse(fs.readFileSync(actividadesFilePath, 'utf-8'));

const controller = {

activities: (req, res) => {
    db.Actividad.findAll()
    .then((actividades)=>{
        let listaActividades = [];

        for(a of actividades){
            listaActividades.push( {
                nombre: a.nombre,
                participantes: a.cantidad_maxima,
                valor: a.valor,
                imagen:a.imagen,
                descripcion: a.descripcion
            });
        }
        // const actividades = JSON.parse(fs.readFileSync(actividadesFilePath, 'utf-8'));
        //vista con todas las actividades
        res.render('activities', {actividades: listaActividades})
    })
},

detalle: (req, res) => {
    //vista con detalle actividad
    let nombreActividad = req.params.nombre;

    // let actividadParticular = null;

    // for (let o of actividades) {
    //     if (o.nombre==nombreActividad){
    //         actividadParticular=o;
    //         break
    //     }
    // }
    db.Actividad.findAll()
    .then((actividades)=>{
        
        let detalleActividad = null;

        for(a of actividades){
            if (a.nombre==nombreActividad){
                detalleActividad=a
                break;
            }
        }
   

    if (detalleActividad){ 

        res.render('detalle', {actividad: detalleActividad})
    }else{
        res.send('Actividad no encontrada.');
    }
})
},

//crear actividad

create: (req, res) => {
    res.render('form-crear-actividad')
},
store: (req, res) => {
    // let datos = req.body;
    // let imagen=req.file;
    // let nuevaActividad = {
    //     "nombre": datos.nombre,
    //     "imgPrincipal": imagen.filename,
    //     "precio": datos.precio,
    //     "participantes": datos.participantes,
    //     "categoria": datos.categoria,
    //     "descripcion": datos.descripcion   
    // }
    // //los valores que tomamos del formulario lo enviamos a actividades para guardarlo de manera logica
    // actividades.push(nuevaActividad);
    // // y aca lo guardamos de manera fisica
	// fs.writeFileSync(actividadesFilePath,JSON.stringify(actividades, null, " "),'utf-8');
    // // una vez agregado el producto volvemos a una vista en este caso el home
    

    db.Actividad.create({
        nombre: req.body.nombre,
        tipo: req.body.categoria,
        valor: req.body.precio,
        cantidad_maxima: req.body.participantes,
        imagen:req.file.filename,
        descripcion:req.body.descripcion
    })

    res.redirect('/');
    

},

update: (req, res) => {
    // let nombreActividad = req.params.nombre;

    // let actividadBuscada = null;

    // for (let o of actividades) {
    //     if (o.nombre==nombreActividad){
    //         actividadBuscada=o;
    //         break
    //     }
    // }
    // if (actividadBuscada != null){
    //    res.render ("form-actualizar-actividad.ejs", {actividades:actividadBuscada})
    // }else{
    //     res.send('Actividad no encontrada.');
    // }

    let nombreActividad = req.params.nombre;
    db.Actividad.findAll()
    .then((actividades)=>{
        
        let detalleActividad = null;

        for(a of actividades){
            if (a.nombre==nombreActividad){
                detalleActividad=a
                break;
            }
        }
   

    if (detalleActividad){ 

        res.render('form-actualizar-actividad.ejs', {actividad: detalleActividad})
    }else{
        res.send('Actividad no encontrada.');
    }
})
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