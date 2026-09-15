const express = require('express');
const router = express.Router();

// Importamos todas las funciones del controlador
const { 
    listarProductos, 
    crearProducto, 
    actualizarProducto, 
    eliminarProducto 
} = require('../controllers/productoController');

// 1. READ (GET) -> Ver productos
router.get('/productos', listarProductos);

// 2. CREATE (POST) -> Guardar nuevo producto
router.post('/productos', crearProducto);

// 3. UPDATE (PUT) -> Editar un producto por su ID
router.put('/productos/:id', actualizarProducto);

// 4. DELETE (DELETE) -> Borrar un producto por su ID
router.delete('/productos/:id', eliminarProducto);

module.exports = router;