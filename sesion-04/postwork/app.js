require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const {productos} = require("./services");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const PORT = 4001;
app.listen(PORT, () => console.log("The server is Alive!!"))

const usuarios = {Uriel:"123", Erandi:"123", Javier:"123"};

app.use((req,res,next)=>{
  if (req.body.name && req.body.password) {
    if (usuarios[req.body.name] === req.body.password) {
      next();
    }else{
      res.status(403);
    res.send({mensaje:"Tus credenciales son incorrectas"})
    }
  }else{
    res.status(403);
    res.send({mensaje:"Te tienes que autenticar"})
  }
})

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@bedu-shop.kvmql1s.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`

console.log(uri);

mongoose.connect(uri);

app.get('/',(req, res) => res.send("Hola Mundo"))

const gods = { 
  Zeus: { 
    live: 'Olympus', 
    symbol: 'Thunderbolt' }, 
  Hades : { 
    live : 'Underworld', 
    symbol: 'Cornucopia' 
  } 
};

app.use("/gods",(req,res,next)=>{
  if (!req.body.mensaje) {
    res.status(400);
    res.send({mensaje:"Debes venerar a los dioses"});
  }else{
    next()
  }
})

app.get('/gods', (req, res) => res.send(gods))

app.get('/gods/:name', (req, res) => {
  var name = gods[req.params.name]
  if(name)
    res.status(200).send(name)
  else
    res.status(404).send("No se encontro el dios")
})

app.put('/gods/:name', (req,res) => {
  const god = req.body;
  console.log(god)
  gods[req.params.name] = god;
  res.status(200).send(gods)
})

app.post('/god', (req,res) => {
  const name = req.query.name
  if (name) {
    const newGod = req.body
    gods[name] = newGod
    res.status(200).send(gods)
  }else{
    res.status(400);
    res.send({mensaje:"Falta el nombre del dios"})
  }
  
})

app.delete('/gods/:name', (req,res) => {
  const name = req.params.name;
  if(name){
    if (delete gods[name])
    res.status(200).send(gods)
  else
    res.status(500)
  }else{
    res.status(400);
    res.send({message:"Falta el nombre"})
  }
  
})

app.get('/productos', (req,res) => {
  productos.obtenerProductos()
  .then(data => {
    res.status(200).send(data);
  })
});