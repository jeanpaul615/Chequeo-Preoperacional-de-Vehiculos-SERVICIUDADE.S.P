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
    const { user_id, name, license_until} = req.body;

    if (!user_id, !name || !license_until) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const newDriverData = {
        user_id,
        name,
        license_until
    };

    Driver.NewDriverRegister(newDriverData, (err, result) => {
        if (err) {
            console.error('Error al registrar nuevo conductor:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        res.status(201).json({ message: 'Nuevo conductor registrado con éxito', id: result.insertId });
    });
};

const UpdateDriver = (req, res) => {
    // Limpia los datos recibidos
    const { name, license_until, user_id } = req.body;
  
  
    // Verificar si todos los campos requeridos están presentes
    if (!name || !license_until || !user_id) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }
  
    const updateDriverData = {
        name, license_until, user_id
    };
  
    /* Llamar a UpdateDriver para hacer la consulta y 
    posteriormente retornar un status server.*/
    Driver.UpdateDriver(updateDriverData, (err, result) => {
      if (err) {
        console.error("Error al actualizar el usuario:", err);
        return res.status(500).json({ error: "Error en el servidor" });
      }
  
      res.status(200).json({
        message: "Usuario actualizado con éxito",
        affectedRows: result.affectedRows,
      });
    });
  };

module.exports = {
    getAllDrivers, DriverRegister, UpdateDriver
};
