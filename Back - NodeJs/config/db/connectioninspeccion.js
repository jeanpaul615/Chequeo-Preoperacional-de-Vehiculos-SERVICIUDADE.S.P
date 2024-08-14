const mysql = require('mysql');
require('dotenv').config(); 

// Configuración para la primera base de datos
const connectioninspeccion = mysql.createConnection({
    host: process.env.DB1_HOST,
    user: process.env.DB1_USER,
    password: process.env.DB1_PASSWORD,
    database: process.env.DB1_NAME,
});

// Conexión a la primera base de datos
connectioninspeccion.connect(function(err) {
    if (err) {
        console.error('Error connecting to database 1:', err);
        return; // Salir si hay un error de conexión
    }
    console.log('Conectado a la base de datos 1 con id', connectioninspeccion.threadId);
});

// Exportar la conexión directamente
module.exports = connectioninspeccion;
