var express=require("express")
var app=express()
const dotenv = require("dotenv")
const bodyparser = require("body-parser")
var cors= require("cors")
const mongoose = require("mongoose")

dotenv.config()
app.use(bodyparser.json())
app.use(cors())

mongoose.connect('mongodb://localhost/Usuario', {useNewUrlParser: true, useUnifiedTopology: true});
var UsuarioSchema, Usuario;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Base conectada")
    UsuarioSchema = new mongoose.Schema({
        usuario: String,
        contrasena: String
      });
       Usuario=mongoose.model('Usuario', UsuarioSchema);
});



app.get("/",(req,res)=>{    
   
    
})

app.post("/login", (req,res)=>{
    let data= req.body;
    console.log(data)
    Usuario.find({ usuario: data.Usuario, contrasena: data.Contrasena}, 
        function (err, usuario)
        {
            if(err || usuario.length === 0)
            {
                console.log(err)
                res.json({
                    estado: "FALLIDO",
                    mensaje: "Credenciales incorrectas"
                })
                return
            }
            console.log(usuario)
            res.json({
                estado: "EXITOSO",
                mensaje: "Bienvenido"    
            })         
        });
})

app.post("/register", (req,res)=>{
    let data= req.body;
    
    Usuario.find({ usuario: data.Usuario}, 
        function (err, usuarios)
        {
            if(err || usuarios.length !== 0)
            {
                console.log(err)
                res.json({
                    estado: "FALLIDO",
                    mensaje:"Usuario ya existe"
                })
                return
            }
            const usuario = new Usuario({ usuario: data.Usuario, contrasena: data.Contrasena});      
            usuario.save(function (err, usuario) {
                if(err)
                {
                    console.log(err)
                    res.json({
                        estado: "FALLIDO",
                        mensaje:"Error al crear el usuario"
                    })
                    return
                }
                console.log(usuario)
                res.json({
                    estado: "EXITOSO",
                    mensaje:"Usuario creado"
                })         
              });
        });

})



app.listen(4000)

