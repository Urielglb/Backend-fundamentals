require('dotenv').config();

const { MongoClient } = require('mongodb');

const {productos} = require("./services");

// const client = new MongoClient(process.env.MONGO_URL);

const client = new MongoClient(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@bedu-shop.kvmql1s.mongodb.net/?retryWrites=true&w=majority`)

client.connect().then(async ()=>{
    console.log("Conexión lista");
    const resultado = await productos.findProduct("636bcaaffc13ae65d5000545");
    console.log(resultado);
}).catch((err)=>{
    console.log(err, "Algo salio mal");
});