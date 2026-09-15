// Crear el modelo de productos

const { DataTypes } = require('sequelize');
const sequelize = require('../database');


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
        type: DataTypes.STRING(255) //NVARCHAR / VARCHAR (250)
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2), //DECIMAL
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    tableName: 'productos',
}
);

module.exports = Producto;