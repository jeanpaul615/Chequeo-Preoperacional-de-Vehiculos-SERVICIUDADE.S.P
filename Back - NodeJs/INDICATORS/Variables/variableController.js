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

const registerVariable = (req, res) => {
    const {indicador_id, variable_id, valor, periodo} = req.body;

    if (!indicador_id || !variable_id || !valor || !periodo ) {
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
            console.error('Error al registrar nueva variable: ',err);
            return res.status(500).json({error: 'Error en el servidor'});
        }
        res.status(201).json({message: 'Nueva variable registrada con exito', id: result.insertId})
    });
};




module.exports = {
    getAllVariables, getVariablesById, registerVariable
};
