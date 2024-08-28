const express = require('express');
const router = express.Router();
const driverController = require('./driverController'); // Asegúrate de que la ruta es correcta

// Ruta para obtener todos los vehículos
router.get('/', driverController.getAllDrivers);
router.post('/newdriver', driverController.DriverRegister);
router.put("/updatedriver", driverController.UpdateDriver);


module.exports = router;
