//GET Conectado a SQL SERVER
const Producto = require('../models/Producto');
const listarProductos = async (req, res) => {
    try {
        const productos = 
        await Producto.findAll(); //Porque estamos esperando SQL SERVER responda
        res.status(200).json(productos);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al obtener los productos"
        });
    }
}
module.exports = {
    listarProductos
}


const crearProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock } = req.body;
    const nuevoProducto = await Producto.create({
      nombre,
      descripcion,
      precio,
      stock
    });
    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error(error);
    res.status(400).json({ mensaje: 'Error al crear el producto', detalle: error.message });
  }
};


const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock } = req.body;

    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    await producto.update({
      nombre,
      descripcion,
      precio,
      stock
    });

    res.status(200).json({ mensaje: 'Producto actualizado correctamente', producto });
  } catch (error) {
    console.error(error);
    res.status(400).json({ mensaje: 'Error al actualizar el producto', detalle: error.message });
  }
};




const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const filasEliminadas = await Producto.destroy({
      where: { id: id }
    });

    if (filasEliminadas === 0) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.status(200).json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar el producto', detalle: error.message });
  }
};

module.exports = {
  listarProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};