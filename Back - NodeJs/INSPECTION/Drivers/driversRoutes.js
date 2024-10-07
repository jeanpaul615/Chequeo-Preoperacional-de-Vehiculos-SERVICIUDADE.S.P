// Importar la biblioteca Express
const express = require('express');
// Crear un router para manejar las rutas
const router = express.Router();
// Importar el controlador de conductores
const driverController = require('./driverController'); // Asegúrate de que la ruta es correcta

// Definir las rutas y asignar las funciones del controlador
// Ruta para obtener todos los vehículos
router.get('/', driverController.getAllDrivers);

// Ruta para obtener un conductor por nombre
router.post("/driverbyname", driverController.GetDriverByName);

// Ruta para registrar un nuevo conductor
router.post('/newdriver', driverController.DriverRegister);

// Ruta para actualizar un conductor existente
router.put("/updatedriver", driverController.UpdateDriver);

// Exportar el router para que pueda ser utilizado en otras partes de la aplicación
module.exports = router;
