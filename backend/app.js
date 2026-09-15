const express = require('express');
const app = express();

const sequelize = require('./config/database');
const Producto = require('./models/Producto');
const productoRoutes = require('./routes/productoRoutes');

// Middlewares
app.use(express.json());

// Rutas
app.use('/api', productoRoutes);

app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API de Productos!');
});

const PORT = process.env.PORT || 3000;

// Inicialización controlada
async function iniciarServidor() {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida correctamente.');

        // Sincroniza la tabla en SQL Server si no existe
        await sequelize.sync();
        console.log('Base de datos sincronizada correctamente.');

        app.listen(PORT, () => {
            console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error al inicializar la aplicación:', error.message);
        process.exit(1);
    }
}

iniciarServidor();