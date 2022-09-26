const controller = {
    home: (req, res) => {
        res.render('home')
    },

    /*restaurante: (req, res) => {
        res.render('restaurante')
    },*/
   
    register: (req, res) => {
        res.render('registro');
    },
    login: (req, res) => {
        res.render('login')
    },

}
module.exports = controller;