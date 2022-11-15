const expres = require('express');
const {usuarios, ventas, productos} = require("../controllers");

const router = expres.Router();

router.post("/compra/:pid",async (req,res)=>{
    const {userId} = req.body;
    const {pid} = req.params;
    const usuario = await usuarios.obtenerUsuarioPorID(userId);
    const producto = await productos.obtenerProductoPorID(pid);
    if(usuario && producto){
        const venta = await ventas.crearVenta(usuario,producto);
        usuario.compras = usuario.compras? [...usuario.compras, venta._id] : [venta._id];
        await usuario.save();
        producto.ventas = producto.ventas? [...producto.ventas, venta._id] : [venta._id];
        await producto.save();
        return res.status(200).send({mensaje:"ok"});
    }
    return res.status(404).send({mensaje:"No se encontro usuario o producto"});
});

module.exports = router