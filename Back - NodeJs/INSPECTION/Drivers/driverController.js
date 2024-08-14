const Driver = require('./Drivers'); // Importa el módulo correcto

// Controlador para obtener todos los vehículos
const getAllDrivers = (req, res) => {
    Driver.getAllDrivers((err, Drivers) => {
        if (err) {
            console.error('Error al obtener conductores:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        res.json(Drivers);
    });
};

module.exports = {
    getAllDrivers
};
