const Indicator = require('./Indicators'); // Importa el módulo correcto

// Controlador para obtener todos los indicadores
const getAllIndicators = (req, res) => {
    Indicator.getAllIndicators((err, indicators) => {
        if (err) {
            console.error('Error al obtener indicadores:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        res.json(indicators);
    });
};

const registerIndicator = (req, res) => {
    const { indicador_id, valor, periodo_inicio } = req.body;

    if (!indicador_id || !valor || !periodo_inicio) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const newIndicatorData = {
        indicador_id,
        valor,
        periodo_inicio
    };

    Indicator.NewIndicatorRegister(newIndicatorData, (err, result) => {
        if (err) {
            console.error('Error al registrar nuevo indicador:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        res.status(201).json({ message: 'Nuevo indicador registrado con éxito', id: result.insertId });
    });
};



module.exports = {
    getAllIndicators,
    registerIndicator
};
