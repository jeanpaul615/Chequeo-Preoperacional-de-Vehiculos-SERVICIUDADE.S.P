const express = require('express');
const router = express.Router();
const indicatorController = require('./indicatorController'); // Importa el controlador de indicadores

// Ruta para obtener todos los indicadores
router.get('/', indicatorController.getAllIndicators);
/**
 * @route GET /
 * @description Obtiene todos los indicadores paginados.
 * @access Público
 */

// Ruta para obtener una lista desplegable de indicadores
router.get('/getindicators', indicatorController.getIndicators);
/**
 * @route GET /getindicators
 * @description Obtiene una lista de indicadores (nombre y periodicidad) para mostrarlos en una lista desplegable.
 * @access Público
 */

// Ruta para registrar un nuevo indicador
router.post('/register', indicatorController.registerIndicator);
/**
 * @route POST /register
 * @description Registra un nuevo indicador en la base de datos.
 * @access Público
 * @body {Object} - Los datos del indicador a registrar (indicador_id, valor, periodo_inicio).
 */

// Ruta para verificar si un indicador ya existe
router.post('/verifyindicator', indicatorController.VerifyIndicator);
/**
 * @route POST /verifyindicator
 * @description Verifica si un indicador ya existe para evitar duplicados.
 * @access Público
 * @body {Object} - Los datos del indicador a verificar (indicador_id, periodo_inicio).
 */

// Ruta para actualizar un indicador
router.post('/updateindicator', indicatorController.UpdateIndicator);
/**
 * @route POST /updateindicator
 * @description Actualiza el valor de un indicador en la base de datos.
 * @access Público
 * @body {Object} - Los datos del indicador a actualizar (indicador_id, valor, periodo_inicio).
 */

// Ruta para eliminar un indicador
router.post('/deleteindicator', indicatorController.DeleteIndicator);
/**
 * @route POST /deleteindicator
 * @description Elimina un indicador en la base de datos.
 * @access Público
 * @body {Object} - Los datos del indicador a eliminar (indicador_id, periodo_inicio).
 */

// Ruta para actualizar la frecuencia de un indicador
router.post('/updatefrequencyindicator', indicatorController.UpdateFrequencyIndicator);
/**
 * @route POST /updatefrequencyindicator
 * @description Actualiza la frecuencia de un indicador en la base de datos.
 * @access Público
 * @body {Object} - Los datos de la frecuencia del indicador a actualizar (id_indicador, frecuencia).
 */

module.exports = router;
/**
 * Exporta el enrutador de Express que contiene todas las rutas relacionadas con indicadores.
 */
