const mongoose = require("mongoose");

const ProductoSchema = mongoose.Schema({
    nombre : {type: String, require: true},
    precio: Number,
    descripcion : String,
    ventas:Array
},{
    collection: "Productos",
    timestamps: true
})

const Producto = mongoose.model("Producto", ProductoSchema);

module.exports = Producto;