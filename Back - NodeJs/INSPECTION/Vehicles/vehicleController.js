const Vehicle = require('./Vehicles');

// Controlador para obtener todos los vehículos
const getAllVehicles = (req, res) => {
    Vehicle.getAllVehicles((err, vehicles) => {
        if (err) {
            console.error('Error al obtener vehículos:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        return res.json(vehicles);
    });
};

// Controlador para crear un nuevo vehículo
const createVehicle = (req, res) => {
    const newVehicle = req.body;
    Vehicle.createVehicle(newVehicle, (err, result) => {
        if (err) {
            console.error('Error al crear vehículo:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        return res.status(201).json({ message: 'Vehículo creado con éxito', vehicleId: result.insertId });
    });
};

// Controlador para actualizar un vehículo
const updateVehicle = (req, res) => {
    const updatedVehicle = req.body;
    Vehicle.updateVehicle(updatedVehicle, (err, result) => {
        if (err) {
            console.error('Error al actualizar vehículo:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        return res.status(200).json({ message: 'Vehículo actualizado con éxito', affectedRows: result.affectedRows });
    });
};

// Controlador para eliminar un vehículo
const DeleteVehicle = (req, res) => {
    const { vehicle_id } = req.body;
  
    if (!vehicle_id) {
        return res.status(400).json({ error: "El ID del vehículo es obligatorio" });
    }
  
    Vehicle.DeleteVehicle({ vehicle_id }, (err, result) => {
        if (err) {
            console.error("Error al eliminar el vehículo:", err);
            return res.status(500).json({ error: "Error en el servidor" });
        }
        return res.status(200).json({
            message: "Vehículo eliminado con éxito",
            affectedRows: result.affectedRows,
        });
    });
};

module.exports = {
    getAllVehicles,
    createVehicle, 
    updateVehicle,
    DeleteVehicle
};
