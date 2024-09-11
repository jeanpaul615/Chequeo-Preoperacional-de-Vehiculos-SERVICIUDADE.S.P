const Driver = require('./Drivers'); // Importa el módulo correcto

// Controlador para obtener todos los conductores
const getAllDrivers = (req, res) => {
    Driver.getAllDrivers((err, Drivers) => {
        if (err) {
            console.error('Error al obtener conductores:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        res.json(Drivers);
    });
};

// Controlador para registrar un nuevo conductor
const DriverRegister = (req, res) => {
    const { user_id, name, license_until } = req.body;

    // Corregido el uso del operador lógico para verificar si los campos están presentes
    if (!user_id || !name || !license_until) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const newDriverData = { user_id, name, license_until };

    Driver.NewDriverRegister(newDriverData, (err, result) => {
        if (err) {
            console.error('Error al registrar nuevo conductor:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        res.status(201).json({ message: 'Nuevo conductor registrado con éxito', id: result.insertId });
    });
};

// Controlador para obtener conductor por nombre
const GetDriverByName = (req, res) => {
    const { driver_name } = req.body;

    if (!driver_name) {
        return res.status(400).json({ error: 'El nombre del conductor es obligatorio' });
    }

    Driver.getDriverbyName({ driver_name }, (err, result) => {
        if (err) {
            console.error('Error al consultar el conductor:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'Conductor no encontrado' });
        }

        res.status(200).json({ result });
    });
};

// Controlador para actualizar conductor
const UpdateDriver = (req, res) => {
    const { name, license_until, user_id } = req.body;

    if (!name || !license_until || !user_id) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const updateDriverData = { name, license_until, user_id };

    Driver.UpdateDriver(updateDriverData, (err, result) => {
        if (err) {
            console.error('Error al actualizar el conductor:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }

        res.status(200).json({
            message: 'Conductor actualizado con éxito',
            affectedRows: result.affectedRows,
        });
    });
};

module.exports = {
    getAllDrivers,
    DriverRegister,
    GetDriverByName,
    UpdateDriver,
};
