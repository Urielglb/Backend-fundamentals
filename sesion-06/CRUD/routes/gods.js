const express = require('express');

const router = express.Router();

const gods = {
    Zeus: {
        live: 'Olympus',
        symbol: 'Thunderbolt'
    },
    Hades: {
        live: 'Underworld',
        symbol: 'Cornucopia'
    }
};

router.use("/", (req, res, next) => {
    if (!req.body.mensaje) {
        res.status(400);
        res.send({ mensaje: "Debes venerar a los dioses" });
    } else {
        next()
    }
})

router.use("/", (req, res, next) => {
    if (!req.body.mensaje) {
        res.status(400);
        res.send({ mensaje: "Debes venerar a los dioses" });
    } else {
        next()
    }
})

router.get('/', (req, res) => res.send(gods))

router.get('/:name', (req, res) => {
    var name = gods[req.params.name]
    if(name)
      res.status(200).send(name)
    else
      res.status(404).send("No se encontro el dios")
  })
  
  router.put('/:name', (req,res) => {
    const god = req.body;
    console.log(god)
    gods[req.params.name] = god;
    res.status(200).send(gods)
  })
  
  router.post('/god', (req,res) => {
    const name = req.query.name
    if (name) {
      const newGod = {live:req.body.live,symbol:req.body.symbol}
      gods[name] = newGod
      res.status(200).send(gods)
    }else{
      res.status(400);
      res.send({mensaje:"Falta el nombre del dios"})
    }
    
  })
  
  router.delete('/:name', (req,res) => {
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

module.exports = router