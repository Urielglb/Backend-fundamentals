const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    nombre:String,
    correo: String,
    password:String,
    compras: Array,
    reseñas: Array,
});

const Usuario = model('Usuario', UserSchema, 'Usuarios');

module.exports = Usuario;

