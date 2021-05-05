const { Router } =  require('express');
const router = Router();

const Usuario = require('../modelos/usuario');


inicio = router.post("/login", (req,res)=>{
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

registro = router.post("/register", (req,res)=>{
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

});

module.exports = router;
