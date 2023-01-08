const ejs = require('ejs');
const db = require('../../database/models');
const {validationResult} = require('express-validator');

const APIcontroller = {

    verAPI: (req, res) => {
        db.Persona.findAll()
        .then(function (respuesta){
            res.status(200).json({
                total: respuesta.length,
                data: respuesta,
                status: 200
            })
        })
    },

    users: (req, res) => {
        db.Persona.findAll()
        .then(function (respuesta){
            res.json({
                count: respuesta.length,
                users: respuesta,
            })
        })
    },
    particular: (req, res) => {
        db.Persona.findByPk(req.params.id)
        .then(function (respuesta){
            res.json({
                Nombre: respuesta.nombre,
                Email: respuesta.email,
                Usario: respuesta.username,
            })
        })
    },
    tipo: (req, res) => {
        // db.Actividad.findAll()
        // .then(function (respuesta){
        //     res.json({
        //         count: respuesta.length,
        //         products: respuesta
  
        //     })
        // })
    },
    actividades: (req, res) => {
        db.Tipo_actividad.findAll()
        .then(function (respuesta){
            let nuevo = 0
            let tipos = []
            let tiposTotal = []
            for (r of respuesta){
                tiposTotal.push(r.tipo)
                if (!tipos.includes(r.tipo)){
                    tipos.push(r.tipo)
                } 
            }

            let repeticion = []
            let ocurrencia = 0
            let organizado = {}

            for (t of tipos){
                
                for (tt of tiposTotal){
                    if (t == tt){
                        ocurrencia = ocurrencia + 1
                    }
                }
                repeticion.push(ocurrencia)
                ocurrencia = 0
            }          
            console.log(organizado)
            cat = [tipos, repeticion]
            // res.json({
            //     categorias: [tipos, repeticion]
               
  
            // })
        })
        db.Actividad.findAll()
        .then(function (respuesta){
            res.json({
                count: respuesta.length,
                products: respuesta,
                countByCategory: cat
  
            })
        })
    },
    totalCategorias: (req, res) => {
        db.Tipo_actividad.findAll()
        .then(function (respuesta){
           
            let tipos = []
            for (r of respuesta){
                if (!tipos.includes(r.tipo)){
                    tipos.push(r.tipo)
                } 
            }
            res.json({
                total: tipos.length
            })
        })

    },
    particularProduct: (req, res) => {

        db.Actividad.findByPk(req.params.id)
        .then(function (respuesta){
            let act = respuesta
        
        db.Tipo_actividad.findByPk(req.params.id)
        .then(function (resp){
            let detalle = resp
        
        res.json({
            // actividad: act,
            // detalle: resp,
            id: act.id,
            nombre: act.nombre,
            tipo: resp.tipo,
            valor: resp.valor,
            cantidad_maxima: resp.cantidad_maxima,
            imagen: resp.imagen,
            descripcion: resp.descripcion,
        })
    })
    })
    },

    // Dashboard

    totalUsuarios: (req, res) => {
        db.Persona.findAll()
        .then(function (respuesta){
           
            res.json({
                total: respuesta.length
            })
        })

    },
    totalProductos: (req, res) => {
        db.Actividad.findAll()
        .then(function (respuesta){
           
            res.json({
                total: respuesta.length
            })
        })

    },
    ultimoUsuario: (req, res) => {
        db.Persona.findAll()
        .then(function (respuesta){

            let userId = []

            for (r of respuesta){
                userId.push(r.id)
            }
            
            let lastUser = userId.pop()

            db.Persona.findByPk(lastUser)
            .then(function (resp){
                console.log(resp)
                res.json({
                    id: resp.id,
                    nombre: resp.nombre,
                    email: resp.email,
                    usuario: resp.username
                })
            })

        })

    },
    ultimoProducto: (req, res) => {
        db.Actividad.findAll()
        .then(function (respuesta){

            let actividadId = []

            for (r of respuesta){
                actividadId.push(r.id)
            }
            
            let lastActivity = actividadId.pop()

            db.Actividad.findByPk(lastActivity)
            .then(function (resp){

                db.Tipo_actividad.findByPk(lastActivity)
                .then(function (respt){
                
                res.json({
                    // actividad: act,
                    // detalle: resp,
                    id: resp.id,
                    nombre: resp.nombre,
                    tipo: respt.tipo,
                    valor: respt.valor,
                    cantidad_maxima: respt.cantidad_maxima,
                    imagen: respt.imagen,
                    descripcion: respt.descripcion,
                })
            })
                
            })

        })

    },
    Categorias: (req, res) => {
        db.Tipo_actividad.findAll()
        .then(function (respuesta){
           
            let tipos = []
            for (r of respuesta){
                if (!tipos.includes(r.tipo)){
                    tipos.push(r.tipo)
                } 
            }
            res.json({
                categorias: tiposTt
            })
        })

    },
    
}

module.exports = APIcontroller;