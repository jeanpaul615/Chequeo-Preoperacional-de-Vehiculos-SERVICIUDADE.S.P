const express = require('express');
const router = express.Router();
const variablesController = require('./variableController');

// Ruta para obtener todas las variables
router.get('/', variablesController.getAllVariables);
/**
 * @route GET /
 * @description Obtiene todas las variables.
 * @access Public
 * @returns {Array} 200 - Una lista de todas las variables.
 */

router.get('/getvariables', variablesController.getVariables);
/**
 * @route GET /getvariables
 * @description Obtiene una lista de todas las variables.
 * @access Public
 * @returns {Array} 200 - Lista de variables.
 */

router.get('/variablesbyid', variablesController.getVariablesById);
/**
 * @route GET /variablesbyid
 * @description Obtiene variables basadas en el ID del indicador.
 * @access Public
 * @param {number} valor_indicador.query - ID del indicador para buscar variables.
 * @returns {Array} 200 - Lista de variables correspondientes al ID del indicador.
 */

router.post('/register', variablesController.registerVariable);
/**
 * @route POST /register
 * @description Registra una nueva variable.
 * @access Public
 * @param {Object} variable - Datos de la variable a registrar.
 * @param {number} variable.indicador_id - ID del indicador.
 * @param {number} variable.variable_id - ID de la variable.
 * @param {number} variable.valor - Valor de la variable.
 * @param {string} variable.periodo - Período de la variable.
 * @returns {Object} 201 - Mensaje de éxito con el ID de la nueva variable.
 * @returns {Error} 400 - Si faltan campos obligatorios.
 * @returns {Error} 500 - Si ocurre un error en el servidor.
 */

module.exports = router;
/**
 * @module variablesRouter
 * @description Módulo de rutas para manejar las operaciones relacionadas con las variables.
 */
