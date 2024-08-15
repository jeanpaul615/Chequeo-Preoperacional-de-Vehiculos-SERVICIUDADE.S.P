const express = require('express');
const router = express.Router();
const indicatorController = require('./indicatorController');

// Ruta para obtener todos los indicadores
router.get('/', indicatorController.getAllIndicators);

module.exports = router;
