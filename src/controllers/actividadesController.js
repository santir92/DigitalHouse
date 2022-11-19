const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const db = require('../../database/models');

//esta variable nos muestra donde se encuntra la data de las actividades

// const actividadesFilePath = path.join(__dirname, '../database/actividades.json');
// const actividades = JSON.parse(fs.readFileSync(actividadesFilePath, 'utf-8'));

const controller = {

activities: (req, res) => {
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
                // participantes: a.cantidad_maxima,
                // valor: a.valor,
                // imagen:a.imagen,
                // descripcion: a.descripcion
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
    db.Actividad.findAll({include:[{association:'tipo'}]})
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
    console.log('crear')
    res.render('form-crear-actividad')
    // db.Tipo_actividad.findAll({raw: true}).then( function (respuesta){
    //     for (r of respuesta){
    //         console.log(r.tipo)
    //     }
    // })
    
 

},
store: (req, res) => {
    // console.log('enviar')
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
	// res.redirect('/');
 
    db.Tipo_actividad.create({
        // tipo: 'tipo',
        // valor: 'valor',
        // cantidad_maxima: 0,
        // imagen: 'imagen',
        // descripcion: 'descripcion',
        tipo: req.body.tipo,
        valor: req.body.valor,
        cantidad_maxima: req.body.participantes,
        imagen: 'imagen',
        descripcion: req.body.descripcion
        
    })

    .then(function(){
    var idBuscado 
  
    db.Tipo_actividad.findAll({raw: true}).then( function (respuesta){
        for (r of respuesta){
            console.log('r.tipo' + r.tipo)
            console.log('req, body,tipo' + req.body.tipo)
            if (r.tipo == req.body.tipo){
                idBuscado = r.id
                console.log('IF--------' + idBuscado)
                break
            }
            // else{
            //     idBuscado = req.body
            // }
            console.log('FUERA DEL IF' + idBuscado)
        }
        return idBuscado
    }
    )
    // console.log('ANTES' + idBuscado)
    // return idBuscado
// }
// )

    .then( function (idBuscado){
    console.log('id buscado----------------------' + idBuscado)
    db.Actividad.create({

        // nombre: 'test2',
        // tipo_actividad_id: 4
        nombre: req.body.nombre,
        
        tipo_actividad_id: idBuscado
        // db.Tipo_actividad.findAll({
        //     where: {
        //         tipo: 'Temporada'
        //     }
        // }).then( function (respuesta){
        //     console.log(respuesta)
        // })

        

    })
    .then(function(){
        res.redirect('/actividades') //////
    })
    
    
})
})},

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


},

 actualizar: (req, res) =>{
// let nombreActividad = req.params.nombre;
// let datos = req.body;
// let nombreImagenAntigua="";

// for (let o of actividades){
//     if (o.nombre== nombreActividad){

//         nombreImagenAntigua = o.imgPrincipal;

//         o.nombre = datos.nombre;
//         o.precio = parseInt(datos.precio);
//         o.participantes = parseInt(datos.participantes);
// 		o.categoria = datos.categoria;
// 		o.descripcion = datos.descripcion;
// 		o.imgPrincipal = req.file.filename;
//         break;
        
//     }
// }


// fs.writeFileSync(actividadesFilePath,JSON.stringify(actividades, null, " "),'utf-8');
// // el metodo unlinkSync elimina la imagen/archivo que le pasamos en la ruta en este caso la foto anterior que estaba cargada
// fs.unlinkSync(__dirname+'/../../public/images/actividades/'+nombreImagenAntigua);

// res.redirect('/')
    db.Actividad.update({
        nombre: 'test_update',
        tipo_actividad_id: 8

    })
    db.Tipo_actividad.update({
        tipo: 'tipo_update',
        valor: 8,
        cantidad_maxima: 8,
        imagen: 'imagen',
        descripcion: 'descripcion'
    })

},


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