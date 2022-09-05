// Importación módulos

const express = require('express')
const path = require('path')

// Definición app

const app = express()

// Indicar que la carpeta public es de recursos estáticos

app.use(express.static(path.join(__dirname, '/public')))

// Poner a correr el servidor en el puerto 3001

app.listen(process.env.PORT || 3001, () => {
    console.log('3001')
})

// Vista home

app.get('/restaurante', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/restaurante.html'))
})

app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/registro.html'));
});