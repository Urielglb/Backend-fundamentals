const mongoose = require("mongoose");

const ProductoSchema = mongoose.Schema({
    nombre : {type: String, require: true},
    precio: {type: Number, require: true},
    descripcion :{type: String, require: true},
    ventas:Array
},{
    collection: "Productos",
    timestamps: true
})

const Producto = mongoose.model("Producto", ProductoSchema);

module.exports = Producto;