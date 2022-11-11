const express = require('express');

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 4001;
app.listen(PORT, () => console.log("The server is Alive!!"))

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
  const newGod = req.body
  gods[name] = newGod
  res.status(200).send(gods)
})

app.delete('/gods/:name', (req,res) => {
  const name = req.params.name;
  if (delete gods[name])
    res.status(200).send(gods)
  else
    res.status(500)
})

const mongoose = require("mongoose")

const db = 'BeduShop'
const dbUser = 'javiGN'
const dbPass = 'javiGN'

const uri = `mongodb+srv://${dbUser}:${dbPass}@cluster0.qrvngpz.mongodb.net/${db}?retryWrites=true&w=majority`

mongoose.connect(uri);

const ProductoSchema = mongoose.Schema({
  nombre : {type: String, require: true},
  precio: Number,
  cat : {type : String, enum:['Alimentos', 'Bebidas', 'Otros']},
  desc : String
},{
  collection: "Productos",
  timestamps: true
})

const Producto = mongoose.model("Producto", ProductoSchema);

app.get('/productos', (req,res) => {
  Producto.find()
  .then(data => {
    res.status(200).send(data);
  })
})