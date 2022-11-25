const db = require('../../database/models');

function userLoggedMiddleware(req, res, next){
    res.locals.isLogged = false;

    let userInCookie = req.cookies.userName;

    let userFromCookie = null;
    if(userInCookie){
        
        db.Persona.findOne({
            where: {
                username: userInCookie
            }
        }).then(result =>{
            
            return userFromCookie = result
            
        })
    }
    if(userFromCookie) {
        req.session.userLogged = userFromCookie;
    }
    
    
    if(req.session && req.session.userLogged){
        res.locals.userLogged = req.session.userLogged;
        res.locals.isLogged = true;
    }
    
    next();
}

module.exports = userLoggedMiddleware;