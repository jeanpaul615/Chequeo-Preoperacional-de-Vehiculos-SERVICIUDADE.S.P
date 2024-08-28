const Vehicle = require('./Vehicles');

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

// Controlador para crear un nuevo vehículo
const createVehicle = (req, res) => {
    const newVehicle = req.body;
    Vehicle.createVehicle(newVehicle, (err, result) => {

        if (err) {
            console.error('Error al crear vehículo:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        res.status(201).json({ message: 'Vehículo creado con éxito', vehicleId: result.insertId });
    });
};

// Controlador para crear un nuevo vehículo
const updateVehicle = (req, res) => {
    const newVehicle = req.body;
    Vehicle.updateVehicle(newVehicle, (err, result) => {

        if (err) {
            console.error('Error al crear vehículo:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        res.status(201).json({ message: 'Vehículo creado con éxito', vehicleId: result.insertId });
    });
};

const DeleteVehicle = (req, res) => {
    const { vehicle_id } = req.body;
  
    if(!vehicle_id){
        res.status(401).json({ error: "Todos los campos son obligatorios" });
    }
    const DeleteVehicleData = {
        vehicle_id
    }
  
    Vehicle.DeleteVehicle(DeleteVehicleData, (err, result) => {
        if(err){
            console.error("Error al eliminar el vehiculo:", err);
            return res.status(500).json({ error: "Error en el servidor" });
        }
      
          res
            .status(200)
            .json({
              message: "Vehiculo eliminado con éxito",
              affectedRows: result.affectedRows,
            });
  
    });
  }





module.exports = {
    getAllVehicles,
    createVehicle, 
    updateVehicle,
    DeleteVehicle
};
