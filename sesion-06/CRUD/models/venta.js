const { ObjectID } = require("bson");
const { Schema, model } = require("mongoose");

const SaleSchema = new Schema({
    producto:{type:ObjectID, required:true},
    usuario: {type:ObjectID, required:true},
    precio :{type:Number, required:true}
});

const Venta = model('Venta', SaleSchema, 'Ventas');

module.exports = Venta;

