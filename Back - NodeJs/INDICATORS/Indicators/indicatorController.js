const Indicator = require('./Indicators'); // Importa el módulo correcto


// Controlador para obtener todos los indicadores
const getIndicators = (req, res) => {
    Indicator.getIndicators((err, indicators) => {
        if (err) {
            console.error('Error al obtener indicadores:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        res.json(indicators);
    });
};

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

const VerifyIndicator = (req, res) => {
    const { indicador_id, periodo_inicio } = req.body;

    if (!indicador_id || !periodo_inicio) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const newIndicatorData = {
        indicador_id,
        periodo_inicio
    };

    Indicator.VerifyIndicator(newIndicatorData, (err, exists) => {
        if (err) {
            console.error('Error al verificar indicador:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }

        if (exists) {
            return res.status(200).json({ exists: true, message: 'Indicador existente' });
        } else {
            return res.status(200).json({ exists: false, message: 'Indicador no encontrado' });
        }
    });
};

module.exports = {
    getIndicators,
    getAllIndicators,
    registerIndicator, 
    VerifyIndicator
};

