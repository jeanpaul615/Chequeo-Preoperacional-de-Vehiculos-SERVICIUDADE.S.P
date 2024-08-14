const mysql = require('mysql');
require('dotenv').config(); 
// Configuración para la segunda base de datos
const connectionindicators = mysql.createConnection({
    host: process.env.DB2_HOST,
    user: process.env.DB2_USER,
    password: process.env.DB2_PASSWORD,
    database: process.env.DB2_NAME,
});

// Conexión a la segunda base de datos
connectionindicators.connect(function(err) {
    if (err) {
        console.error('Error connecting to database 2:', err);
        return; // Salir si hay un error de conexión
    }
    console.log('Conectado a la base de datos 2 con id', connectionindicators.threadId);
});
// Exportar la conexión directamente
module.exports = connectionindicators;
