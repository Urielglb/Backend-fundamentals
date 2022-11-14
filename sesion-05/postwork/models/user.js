const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    nombre:{type:String, required:true},
    correo: {type:String, required:true},
    password:{type:String, required:true},
    compras: Array,
    reseñas: Array,
});

const Usuario = model('Usuario', UserSchema, 'Usuarios');

module.exports = Usuario;

