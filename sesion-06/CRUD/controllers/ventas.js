const { async } = require("regenerator-runtime");
const { usuarios } = require(".");
const {Venta} = require("../models");

const crearVenta = async (usuario, producto)=>{
    const venta = await Venta.create({
        usuario: usuario._id,
        producto:producto._id,
        precio:producto.precio
    });
    return venta;
}

module.exports = {
    crearVenta
}