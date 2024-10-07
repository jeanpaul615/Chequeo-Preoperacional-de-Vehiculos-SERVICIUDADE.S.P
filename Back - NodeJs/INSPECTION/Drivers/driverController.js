const Driver = require('./Drivers'); // Importa el módulo correcto

// Controlador para obtener todos los conductores
const getAllDrivers = (req, res) => {
    //Llamado recursivo al modelo que hace la consulta
    Driver.getAllDrivers((err, Drivers) => {
        if (err) {
            console.error('Error al obtener conductores:', err);//Manejo de erorres por servidor
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        res.json(Drivers); //retornar respuesta de los conductores formato JSON
    });
};

// Controlador para registrar un nuevo conductor
const DriverRegister = (req, res) => {
    const { user_id, name, license_until } = req.body; //Parametros requeridos en el body para hacer consulta

    // Corregido el uso del operador lógico para verificar si los campos están presentes
    if (!user_id || !name || !license_until) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    //Parametros a enviar a el modelo
    const newDriverData = { user_id, name, license_until };
    //Llamado recursivo al modelo que hace la consulta
    Driver.NewDriverRegister(newDriverData, (err, result) => {
        if (err) {
            console.error('Error al registrar nuevo conductor:', err); //Manejo de errores por servidor
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        res.status(201).json({ message: 'Nuevo conductor registrado con éxito', id: result.insertId }); //Retorna un status y un JSON con un message
    });
};

// Controlador para obtener conductor por nombre
const GetDriverByName = (req, res) => {
    const { driver_name } = req.body;//Parametros requeridos en el body para hacer consulta

    if (!driver_name) {
        return res.status(400).json({ error: 'El nombre del conductor es obligatorio' }); //Manejo de errores por falta de consulta
    }
    //Llamado recursivo al modelo que hace la consulta
    Driver.getDriverbyName({ driver_name }, (err, result) => {
        if (err) {
            console.error('Error al consultar el conductor:', err); //Manejo de errores por servidor
            return res.status(500).json({ error: 'Error en el servidor' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'Conductor no encontrado' }); 
        }

        res.status(200).json({ result }); //retorna el estado 200, que salio bien la api y un json con el resultado
    });
};

// Controlador para actualizar conductor
const UpdateDriver = (req, res) => {
    const { name, license_until, user_id } = req.body; //Parametros requeridos en el body para hacer consulta

    if (!name || !license_until || !user_id) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' }); //Manejo de errores por falta de consulta
    }

    const updateDriverData = { name, license_until, user_id };
    //Llamado recursivo al modelo que hace la consulta
    Driver.UpdateDriver(updateDriverData, (err, result) => {
        if (err) {
            console.error('Error al actualizar el conductor:', err);//Manejo de errores por servidor
            return res.status(500).json({ error: 'Error en el servidor' });
        }

        res.status(200).json({
            message: 'Conductor actualizado con éxito',
            affectedRows: result.affectedRows,
        });//retorna el estado 200, que salio bien la api y un json con el resultado
    });
};

module.exports = {
    getAllDrivers,
    DriverRegister,
    GetDriverByName,
    UpdateDriver,
};
