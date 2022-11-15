const {Usuario} = require("../models");

const obtenerUsuarioPorID = async (id)=>{
    try {
        const usuario = await Usuario.findById(id);
        return usuario;
      } catch (error) {
        return null;
      }
      
}

module.exports = {
  obtenerUsuarioPorID
}