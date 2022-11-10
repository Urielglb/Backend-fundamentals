const {Producto} = require("../models");

const findProduct = async (id)=>{
    try {
        const encontrado = await Producto.findById(id);
        return encontrado
    } catch (error) {
        console.log("Algo salió mal en la consulta", error);
    }
    
}

module.exports = {
    findProduct
}