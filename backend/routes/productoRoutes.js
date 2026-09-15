const express = require('express');
const router = express.Router();

const { 
    listarProductos, 
    buscarProducto,
    obtenerProductoPorId,
    crearProducto, 
    actualizarProducto, 
    eliminarProducto 
} = require('../controllers/productoController');

<<<<<<< HEAD
=======
// IMPORTANTE: La ruta de búsqueda debe definirse ANTES que la de /:id 
// para evitar que la palabra "buscar" se interprete como un ID.
router.get('/productos/buscar', buscarProducto);

>>>>>>> cdea2fb (actualizacion producto controllers)
router.get('/productos', listarProductos);
router.get('/productos/:id', obtenerProductoPorId);
router.post('/productos', crearProducto);
router.put('/productos/:id', actualizarProducto);
router.delete('/productos/:id', eliminarProducto);

module.exports = router;