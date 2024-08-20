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

const DriverRegister = (req, res) => {
    const { user_id, name, license_until, seguridad_social_until } = req.body;

    if (!user_id, !name || !license_until || !seguridad_social_until) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const newDriverData = {
        user_id,
        name,
        license_until,
        seguridad_social_until
    };

    Driver.NewDriverRegister(newDriverData, (err, result) => {
        if (err) {
            console.error('Error al registrar nuevo conductor:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        res.status(201).json({ message: 'Nuevo conductor registrado con éxito', id: result.insertId });
    });
};

module.exports = {
    getAllDrivers, DriverRegister
};
