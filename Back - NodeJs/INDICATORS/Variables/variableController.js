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




module.exports = {
    getAllVariables, getVariablesById
};
