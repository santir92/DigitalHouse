// Importación módulos

const express = require('express')
const path = require('path')
const router = require('./src/routes/index.routes')
const actividadesRouter = require('./src/routes/actividades.routes')
const reservasRouter = require('./src/routes/reservas.routes')
const ejs = require('ejs');
//
const methodOverride = require('method-override')


// Definición app

const app = express()

// Indicar que la carpeta public es de recursos estáticos

app.use(express.static(path.join(__dirname, '/public')))
// Indica que se pueden codificar archivos y enviar al Back
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(methodOverride('_method'))
//templete engine

app.set('views', path.join(__dirname, './src/views'))
app.set('view engine', 'ejs')

// Poner a correr el servidor en el puerto 3001

app.listen(process.env.PORT || 3001, () => {
    console.log('3001')
})

// Vistas
app.use('/', router);

app.use('/actividades', actividadesRouter)

app.use ('/carrito', reservasRouter)

