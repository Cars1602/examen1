const Producto = require('../models/Producto');
const { Op } = require('sequelize');

// GET /api/productos
const listarProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.status(200).json(productos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al obtener los productos" });
    }
};

// GET /api/productos/buscar?nombre=texto
const buscarProducto = async (req, res) => {
    try {
        const { nombre } = req.query;
        if (!nombre) {
            return res.status(200).json([]);
        }
        
        const productos = await Producto.findAll({
            where: {
                nombre: {
                    // LIKE para SQL Server
                    [Op.like]: `%${nombre}%` 
                }
            }
        });
        res.status(200).json(productos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error en la búsqueda", detalle: error.message });
    }
};

// GET /api/productos/:id
const obtenerProductoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findByPk(id);
        
        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        
        res.status(200).json(producto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al obtener el producto", detalle: error.message });
    }
};

// Función auxiliar para validaciones (código 400 Bad Request)
const validarDatos = (nombre, precio, stock) => {
    if (!nombre) return "El nombre es obligatorio.";
    if (precio === undefined || precio === null || precio <= 0) return "El precio es obligatorio y debe ser mayor a 0.";
    if (stock === undefined || stock === null || stock < 0) return "El stock es obligatorio y no puede ser negativo.";
    return null;
};

// POST /api/productos
const crearProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio, stock, estado } = req.body;

        // Validaciones 400 Bad Request
        const errorValidacion = validarDatos(nombre, precio, stock);
        if (errorValidacion) {
            return res.status(400).json({ mensaje: errorValidacion });
        }

        const nuevoProducto = await Producto.create({
            nombre,
            descripcion,
            precio,
            stock,
            estado: estado !== undefined ? estado : true // default true
        });
        
        res.status(201).json(nuevoProducto);
    } catch (error) {
        console.error(error);
        res.status(400).json({ mensaje: 'Error al crear el producto', detalle: error.message });
    }
};

// PUT /api/productos/:id
const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio, stock, estado } = req.body;

        // Validaciones 400 Bad Request
        const errorValidacion = validarDatos(nombre, precio, stock);
        if (errorValidacion) {
            return res.status(400).json({ mensaje: errorValidacion });
        }

        const producto = await Producto.findByPk(id);
        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        await producto.update({
            nombre,
            descripcion,
            precio,
            stock,
            estado
        });

        res.status(200).json({ mensaje: 'Producto actualizado correctamente', producto });
    } catch (error) {
        console.error(error);
        res.status(400).json({ mensaje: 'Error al actualizar el producto', detalle: error.message });
    }
};

// DELETE /api/productos/:id
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
    buscarProducto,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};