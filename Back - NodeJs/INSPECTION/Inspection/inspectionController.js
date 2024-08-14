const Inspection = require('./Inspection'); // Importa el módulo correcto

// Controlador para obtener todos los vehículos
const getAllInspection = (req, res) => {
    Inspection.getAllInspection((err, inspection) => {
        if (err) {
            console.error('Error al obtener las inspecciones:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        res.json(inspection);
    });
};

module.exports = {
    getAllInspection
};
