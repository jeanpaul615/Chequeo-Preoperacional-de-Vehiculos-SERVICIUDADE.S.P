const express = require('express');
const router = express.Router();
const vehicleController = require('./vehicleController');

// Ruta para obtener todos los vehículos
router.get('/', vehicleController.getAllVehicles);

// Ruta para crear un nuevo vehículo
router.post('/newvehicle', vehicleController.createVehicle);
router.put('/updatevehicle', vehicleController.updateVehicle);
router.post('/deletevehicle', vehicleController.DeleteVehicle);



module.exports = router;
