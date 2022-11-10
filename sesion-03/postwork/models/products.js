const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
    nombre:String,
    descripcion: String,
    precio: Number,
    ventas:Array
});

const Producto = model('Producto', ProductSchema, 'Productos');

module.exports = Producto;

