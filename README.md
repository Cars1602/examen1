# API REST de Gestión de Productos — Primer Parcial Práctico

* **Estudiante:** Carlos Ademar Suarez y Adaniel Balderrama 
* **Materia:** Programación Web II
* **Carrera:** Ingeniería de Sistemas
* **Institución:** Universidad Privada Domingo Savio (UPDS)

---

## 1. Descripción del Proyecto

API REST modular para la administración de inventario de productos. Desarrollada con Node.js, Express, Sequelize y SQL Server, cumpliendo con la separación arquitectónica MVC (config, controllers, models, routes). La persistencia de datos es completamente real en SQL Server, descartando el uso de arreglos en memoria o datos volátiles.

---

## 2. Tecnologías Utilizadas

* **Node.js** — Entorno de ejecución para JavaScript en backend
* **Express.js** — Framework para la configuración del servidor y enrutamiento HTTP
* **Sequelize** — ORM para la interacción con la base de datos
* **Tedious & MSSQL** — Dialecto y driver de conexión para Microsoft SQL Server
* **Dotenv** — Gestión de variables de entorno seguras
* **Postman** — Plataforma de diseño, pruebas y documentación de peticiones HTTP
* **SQL Server Management Studio (SSMS)** — Motor gestor de base de datos relacional

---

## 3. Estructura del Proyecto

```text
backend/
├── config/
│   └── database.js
├── controllers/
│   └── productoController.js
├── img/
│   ├── basededaatos.png
│   ├── bienvenida.png
│   ├── busquedaennavegador.png
│   ├── conexiondb.png
│   ├── estructura.png
│   ├── fallos.png
│   ├── listarproducto.png
│   └── posman.png
├── models/
│   └── Producto.js
├── routes/
│   └── productoRoutes.js
├── .env
├── .env.example
├── .gitignore
├── app.js
├── package.json
└── README.md
