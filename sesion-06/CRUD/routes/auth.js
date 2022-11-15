const express = require('express');
const {Usuario} = require("../models");

const router = express.Router();

const salt = (x)=> `contraseña-super-segura${x}`

const compare = (x,y) => salt(x) === y

router.post("/login",async (req,res,next)=>{
    const [usuario] = await Usuario.find({correo:req.body.email});
    if (usuario && compare(req.body.password,usuario.password)) {
        return res.status(200).send({mensaje:"Estas logeado"})
    }
    res.status(404).send({mensaje:"No se encontro el usuario"})
})

router.post("/register",async (req,res,next)=>{
    const newUser = {
        correo:req.body.email,
        nombre:req.body.name,
        password: salt(req.body.password),
    };
    const usuarioCreado = await Usuario.find({correo:newUser.correo});
    if (usuarioCreado.length>0) {
        return res.status(400).send({mensaje:"Ya esta creado el usuario"})
    }
    await Usuario.create(newUser);
    res.status(200).send({mensaje:"Usuario creado"})
})

module.exports = router