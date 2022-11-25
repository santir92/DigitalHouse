const ejs = require('ejs');
const db = require('../../database/models');

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
  
            });
        }

        res.render('activities', {actividades: listaActividades})
    })
},

detalle: (req, res) => {
    let nombreActividad = req.params.nombre;

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
    res.render('form-crear-actividad')
},
store: (req, res) => {

    db.Tipo_actividad.create({
 
        tipo: req.body.categoria,
        valor: req.body.valor,
        cantidad_maxima: req.body.participantes,
        imagen: req.file.filename,
        descripcion: req.body.descripcion
        
    })

    .then(result => {
 
    let ultimoId = result.id
    
    db.Actividad.create({

        nombre: req.body.nombre,
        
        tipo_actividad_id: ultimoId
    })
    .then(()=>{
        res.redirect('/actividades')
    })    
})
},

update: (req, res) => {
    let nombreActividad = req.params.nombre;
    db.Actividad.findAll({include:[{association: 'tipo'}]})
    .then(respuesta => {
        let todasLasActividades = respuesta

        let actividadParticular = {}

        for (h of todasLasActividades){
            console.log(respuesta)
            if (nombreActividad == h.nombre){
  
                actividadParticular.nombre = h.nombre
                actividadParticular.id = h.id
                actividadParticular.tipo_actividad_id = h.tipo_actividad_id
                actividadParticular.tipo = h.tipo.tipo
                actividadParticular.descripcion = h.tipo.descripcion
                actividadParticular.valor = h.tipo.valor
                actividadParticular.participantes = h.tipo.cantidad_maxima
            }
        }


    res.render('form-actualizar-actividad', {actividades: actividadParticular})
}

)

},

 actualizar: (req, res) =>{
    let idUpdate = req.params.nombre
    let idTipoActividad
    db.Actividad.findOne({
        where: {
            nombre: req.params.nombre
        }
    })
        .then(respuesta => {
            idTipoActividad = respuesta.tipo_actividad_id
            return idTipoActividad
        })  
    .then(idTipoActividad => {
    db.Actividad.update({        
        nombre: req.body.nombre,
    },
    {
        where:{
            id: req.params.nombre
        }
    })
    db.Tipo_actividad.update({
        tipo: req.body.categoria,
        valor: req.body.precio,
        cantidad_maxima: req.body.participantes,
        imagen: req.file.filename,
        descripcion: req.body.descripcion
    },
    {
        where:{           
            id: idTipoActividad
        }
    })
    .then(() => {
    res.redirect('/actividades')
    })
})

},


delete: (req, res) =>{
    
    db.Actividad.destroy({
        where: {
            nombre: req.params.nombre
        }
    })
    .then(function(){

        res.redirect('/actividades')
    })
}
};


module.exports = controller;