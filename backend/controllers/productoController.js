const Producto = require('../models/Producto');
const { Op } = require('sequelize');

// 2. Listar productos (GET /api/productos)
const listarProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    return res.status(200).json(productos);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// 3. Obtener producto por ID (GET /api/productos/:id)
const obtenerProductoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    return res.status(200).json(producto);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// 4. Registrar producto (POST /api/productos)
const registrarProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, estado } = req.body;

    if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
      return res.status(400).json({ mensaje: 'El nombre es obligatorio.' });
    }
    if (precio === undefined || isNaN(precio) || Number(precio) <= 0) {
      return res.status(400).json({ mensaje: 'El precio es obligatorio y debe ser mayor a 0.' });
    }
    if (stock === undefined || isNaN(stock) || Number(stock) < 0 || !Number.isInteger(Number(stock))) {
      return res.status(400).json({ mensaje: 'El stock es obligatorio y no puede ser negativo.' });
    }

    const nuevoProducto = await Producto.create({
      nombre: nombre.trim(),
      descripcion,
      precio: Number(precio),
      stock: Number(stock),
      estado: estado !== undefined ? Boolean(estado) : true
    });

    return res.status(201).json(nuevoProducto);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// 5. Actualizar producto (PUT /api/productos/:id)
const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, estado } = req.body;

    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
      return res.status(400).json({ mensaje: 'El nombre es obligatorio.' });
    }
    if (precio === undefined || isNaN(precio) || Number(precio) <= 0) {
      return res.status(400).json({ mensaje: 'El precio es obligatorio y debe ser mayor a 0.' });
    }
    if (stock === undefined || isNaN(stock) || Number(stock) < 0 || !Number.isInteger(Number(stock))) {
      return res.status(400).json({ mensaje: 'El stock es obligatorio y no puede ser negativo.' });
    }

    await producto.update({
      nombre: nombre.trim(),
      descripcion,
      precio: Number(precio),
      stock: Number(stock),
      estado: estado !== undefined ? Boolean(estado) : producto.estado
    });

    return res.status(200).json(producto);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// 6. Eliminar producto (DELETE /api/productos/:id)
const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    await producto.destroy();
    return res.status(200).json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// 7. Búsqueda de productos (GET /api/productos/buscar?nombre=texto)
const buscarProductos = async (req, res) => {
  try {
    const { nombre } = req.query;

    if (!nombre) {
      return res.status(200).json([]);
    }

    const productos = await Producto.findAll({
      where: {
        nombre: {
          [Op.like]: `%${nombre}%`
        }
      }
    });

    return res.status(200).json(productos);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listarProductos,
  obtenerProductoPorId,
  registrarProducto,
  actualizarProducto,
  eliminarProducto,
  buscarProductos
};