require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const routes = require("./routes")
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const PORT = 4001;
app.listen(PORT, () => console.log("The server is Alive!!"))

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@bedu-shop.kvmql1s.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`

mongoose.connect(uri);

const usuarios = {Uriel:"123", Erandi:"123", Javier:"123"};

// app.use((req,res,next)=>{
//   if (req.body.name && req.body.password) {
//     if (usuarios[req.body.name] === req.body.password) {
//       next();
//     }else{
//       res.status(403);
//     res.send({mensaje:"Tus credenciales son incorrectas"})
//     }
//   }else{
//     res.status(403);
//     res.send({mensaje:"Te tienes que autenticar"})
//   }
// })

app.get('/',(req, res) => res.send("Hola Mundo"))

app.use("/auth",routes.authRouter)

app.use('/gods', routes.godsRouter)

app.use('/productos',routes.productosRouter);

app.use('/usuario',routes.userRouter);