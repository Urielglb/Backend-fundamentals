const { query } = require('express');
const express = require('express');
const {productos} = require("../controllers");
const router = express.Router();

router.get("/", (req, res) => {
    productos.obtenerProductos()
        .then(data => {
            res.status(200).send(data);
        })
});

router.post("/",async (req,res)=>{
    const producto = req.body;
    const resultado = await productos.crearProducto(producto);
    res.status(200).send(resultado)
    
});

router.patch("/:pid",async (req,res)=>{
    const {pid} = req.params;
    const producto = await productos.obtenerProductoPorID(pid);
    if(!producto){
        return res.status(404).send({mensaje:"No encontramos un producto con ese id"});
    }
    const contenido = req.body;
    for(const key in contenido){
        producto[key] = contenido[key];
    }
    await producto.save();
    res.status(200).send(producto);
});

module.exports = router;