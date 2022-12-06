const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const db = require('../../database/models');

const controller = {
    home: (req, res) => {
        res.render('home')
    },
   
    register: (req, res) => {
        res.render('registro')
    },
   
    registerProcess: (req, res) => {
        // esta variable guarda los errores que vengan de la validacion del middleware
        let resultValidation = validationResult(req);
        // si la variable resultValidation trae errores enviame los mensajes de error y no crea al usuario
        if(resultValidation.errors.length > 0){   
                return res.render('registro', {
                errors: resultValidation.mapped(),
                old:req.body
            });
        }
        // se hace la validacion de que el email no este registrado, si lo esta ingresa al if
        // al encontrar el email envia el msg de error indicando que ese email ya esta registrado
        let emailRegistrado = req.body.email;
        db.Persona.findAll()
        .then((usuarios)=>{

            for(u of usuarios){
                if (u.email==emailRegistrado){
                        res.render('registro', {
                        errors: {
                            email: {
                                msg: 'Este email ya esta registrado'
                            }
                        },
                        old:req.body
                    });
                }
            }
        }).then(()=>{
        db.Persona.create( {
            nombre: req.body.name,
            email: req.body.email,
            imagen: req.file.filename,
            password: bcryptjs.hashSync(req.body.password, 10),
            username: req.body.username,
        })
        res.redirect('/login')
    })
        
    },

    login: (req, res) => {
        res.render('login')
    },
    
    loginProcess: (req, res) => {
        // verificamos que el nombre de usuario este registrado para iniciar sesion sino enviar error
        db.Persona.findOne({
            where: {
                username: req.body.username
            }
        }).then(userToLogin =>{
        //verificamos que el nombre de usuario este registrado para iniciar sesion sino enviar error
        // let userToLogin = User.findUserByField('username', req.body.username);
        
            if(userToLogin){
                //comparar la contrasenia recordar que el primer parametro de compareSync es el texto plano y el segundo es la que se encuentra en la DB hasheada, si ambas coinciden permite el ingreso
                let isOkPassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
                if(isOkPassword){
                    delete userToLogin.password;
                    req.session.userLogged = userToLogin;
                    // se setea la cookie para que aun cuando se cierre el navegador el usuario sea recordado por maximo 1 hora o el tiempo que se desee y cuando vuelva a ingresar ya este logueado
                    if(req.body.remember){
                        res.cookie("userName", req.body.username, {maxAge: (1000 * 60) * 60})
                    }

                    return res.redirect('/profile');
                }
                return res.render('login', {
                    errors: {
                        username: {
                            msg: 'Las credenciales son invalidas'
                        }
                    }
                });
            }
            return res.render('login', {
                errors: {
                    username: {
                        msg: 'Usuario no encontrado'
                    }
                }
            });
        })
    },
    
    profile: (req, res) => {
        res.render('profile', {user: req.session.userLogged})
    },
    // con el metodo logout se eliminan las cookies y la session abierta asi cuando se haga logout en la pagina debera volverse a loguear para ingresar
    logout: (req, res) => {
        res.clearCookie("userName")
        req.session.destroy();
        return res.redirect('/')
    }

}
module.exports = controller;