require('dotenv').config();

const mongoose = require('mongoose');

const {productos} = require("./services");

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@bedu-shop.kvmql1s.mongodb.net/?retryWrites=true&w=majority`,{dbName:"development"})
.then(async ()=>{
    console.log("Conexión lista");
    const resultado = await productos.findProduct("636bcaaffc13ae65d5000545");
    console.log(resultado);
}).catch((err)=>{
    console.log(err, "Algo salio mal");
});