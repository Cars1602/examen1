// Crear el modelo de productos
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
<<<<<<< HEAD

=======
>>>>>>> cdea2fb (actualizacion producto controllers)

const Producto = sequelize.define('Producto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING(255)
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0.01 // Precio mayor a 0
        }
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0 // Stock no negativo
        }
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'productos',
});

module.exports = Producto;