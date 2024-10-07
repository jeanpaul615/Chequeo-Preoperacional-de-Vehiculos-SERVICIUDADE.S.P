const Variable = require('./Variables'); // Importa el módulo correcto

// Controlador para obtener todos los vehículos
const getAllVariables = (req, res) => {
    Variable.getAllVariables((err, variables) => {
        if (err) {
            console.error('Error al obtener variables:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        res.json(variables);
    });
};
/**
 * @route GET /variables
 * @description Obtiene todas las variables disponibles.
 * @access Público
 */

// Controlador para obtener variables para la lista desplegable
const getVariables = (req, res) => {
    Variable.getVariables((err, variables) => {
        if (err) {
            console.error('Error al obtener variables:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        res.json(variables);
    });
};
/**
 * @route GET /variables/get
 * @description Obtiene una lista de variables para mostrarlas en una lista desplegable.
 * @access Público
 */

// Controlador para obtener variables por ID
const getVariablesById = (req, res) => {
    const valor_indicador = req.query.valor_indicador; // Obtiene valor_indicador de los parámetros de consulta

    Variable.getVariablesById(valor_indicador, (err, variables) => {
        if (err) {
            console.error('Error al obtener variables:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        res.json(variables);
    });
};
/**
 * @route GET /variables/getById
 * @description Obtiene variables según el ID proporcionado en los parámetros de consulta.
 * @access Público
 * @query {string} valor_indicador - El ID del indicador para buscar variables.
 */

// Controlador para registrar una nueva variable
const registerVariable = (req, res) => {
    const {indicador_id, variable_id, valor, periodo} = req.body;

    if (!indicador_id || !variable_id || !valor || !periodo) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const newVariableData = {
        indicador_id, 
        variable_id,
        valor, 
        periodo
    };
    Variable.NewVariableRegister(newVariableData, (err, result) => {
        if(err){
            console.error('Error al registrar nueva variable: ', err);
            return res.status(500).json({error: 'Error en el servidor'});
        }
        res.status(201).json({message: 'Nueva variable registrada con éxito', id: result.insertId});
    });
};
/**
 * @route POST /variables/register
 * @description Registra una nueva variable en la base de datos.
 * @access Público
 * @body {Object} - Los datos de la nueva variable (indicador_id, variable_id, valor, periodo).
 */

module.exports = {
    getAllVariables, getVariablesById, registerVariable, getVariables
};
/**
 * Exporta los controladores para obtener, registrar y manejar variables.
 */
