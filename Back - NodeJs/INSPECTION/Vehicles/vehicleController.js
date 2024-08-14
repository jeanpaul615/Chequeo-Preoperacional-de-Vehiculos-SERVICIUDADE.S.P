const Vehicle = require('./Vehicles'); // Importa el módulo correcto

// Controlador para obtener todos los vehículos
const getAllVehicles = (req, res) => {
    Vehicle.getAllVehicles((err, vehicles) => {
        if (err) {
            console.error('Error al obtener vehículos:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        res.json(vehicles);
    });
};

module.exports = {
    getAllVehicles
};
