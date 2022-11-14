const express = require('express');
const {productos} = require("../controllers");
const router = express.Router();

router.get("/", (req, res) => {
    productos.obtenerProductos()
        .then(data => {
            res.status(200).send(data);
        })
})

module.exports = router;