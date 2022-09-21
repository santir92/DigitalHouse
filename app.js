// Importación módulos

const express = require('express')
const path = require('path')
const router = require('./src/routes/index.routes')

// Definición app

const app = express()

// Indicar que la carpeta public es de recursos estáticos

app.use(express.static(path.join(__dirname, '/public')))

//templete engine

app.set('views', path.join(__dirname, './src/views'))
app.set('view engine', 'ejs')

// Poner a correr el servidor en el puerto 3001

app.listen(process.env.PORT || 3001, () => {
    console.log('3001')
})

// Vista home

app.get('/', router);

app.get('/restaurante', router)

app.get('/carrito', router);

app.get('/register', router);

app.get('/login', router);