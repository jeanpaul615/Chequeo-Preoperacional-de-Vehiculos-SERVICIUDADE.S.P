const express = require('express');
const router = express.Router();
const inspectionController = require('./inspectionController'); // Asegúrate de que la ruta es correcta

// Ruta para obtener todos los vehículos
router.get('/', inspectionController.getAllInspection);

module.exports = router;
