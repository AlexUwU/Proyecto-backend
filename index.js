const express = require('express');
const app = express()
const dotenv = require("dotenv")
const bodyparser = require("body-parser")
var cors= require("cors")
const mongoose = require("mongoose")

dotenv.config()

require('./basededatos');

app.set('port', 3000);
app.use(express.json())
app.use(cors())

app.get('/', (req,res) => res.send('Petroll - Backend'));

//INICIO DE SESION
app.use('/api', require('./rutas/inicio'));

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
