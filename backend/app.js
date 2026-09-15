const express = require('express');
const sequelize = require('./backend/config/database');
const app = express();
const Producto = require('./backend/models/Producto');//Importamos el modelo Producto
const productoRoutes = require('./backend/routes/productoRoutes');
app.use(express.json());
app.use('/api', productoRoutes);

app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API de Productos!');
});
sequelize
    .authenticate()
    .then(() => {
        console.log(
            'Conexión a la base de datos establecida correctamente.');
    })
    .catch((error) => {
        console.error(
            'Error al conectar a la base de datos:', error);
    });
app.listen(3000, () => {
    console.log('Servidor ejecutándose en http://localhost:3000');
});
sequelize.sync()
    .then(() => {
        console.log('Base de datos sincronizada correctamente.');
    })
    .catch((error) => {
        console.error('Error al sincronizar la base de datos:', error);
    });