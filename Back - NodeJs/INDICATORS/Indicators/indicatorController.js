const Indicator = require('./Indicators'); // Importa el módulo correcto

// Controlador para obtener todos los vehículos
const getAllIndicators = (req, res) => {
    Indicator.getAllIndicators((err, indicators) => {
        if (err) {
            console.error('Error al obtener vehículos:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        res.json(indicators);
    });
};

module.exports = {
    getAllIndicators
};
