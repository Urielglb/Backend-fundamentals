const { Producto } = require("../models");

async function obtenerProductoPorID(id) {
  try {
    const producto = await Producto.findById(id);
    return producto;
  } catch (error) {
    return null;
  }
  
}

async function obtenerProductos() {
  const data = await Producto.find()
  return data;
}

async function crearProducto(producto) {
  const prod = await Producto.create(producto);
  return prod;
}

async function obtenerProdPorPrecio(precio) {
  const query = {
    'precio': {
      '$lte': precio
    }
  }
  const result = await Producto.find(query);
  return result;
}

async function agregacion(precio) {
  const agr = [
    {
      '$project': {
        'nombre': 1,
        'precio': 1,
        '_id': 0
      }
    }, {
      '$match': {
        'precio': {
          '$lte': precio
        }
      }
    }, {
      '$sort': {
        'precio': -1
      }
    }
  ]
  const result = await Producto.aggregate(agr);
  return result;
}

module.exports = {
  obtenerProductoPorID,
  obtenerProductos,
  crearProducto,
  obtenerProdPorPrecio,
  agregacion
}