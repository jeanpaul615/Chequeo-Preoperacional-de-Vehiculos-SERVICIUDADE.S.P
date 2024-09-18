const express = require('express');
const router = express.Router();
const inspectionController = require('./inspectionController'); // Asegúrate de que la ruta es correcta

// Ruta para obtener todos los vehículos
router.get('/', inspectionController.getAllInspection);
router.post('/newinspection', inspectionController.NewInspection);
router.post('/newvehiclecondition', inspectionController.NewVehicleCondition);



module.exports = router;
