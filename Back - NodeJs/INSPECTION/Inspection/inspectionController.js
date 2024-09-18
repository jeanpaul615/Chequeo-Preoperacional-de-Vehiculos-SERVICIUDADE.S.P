const Inspection = require("./Inspection");

// Controlador para obtener todas las inspecciones
const getAllInspection = (req, res) => {
  Inspection.getAllInspection((err, inspection) => {
    if (err) {
      console.error("Error al obtener las inspecciones:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }
    res.json(inspection);
  });
};

// Controlador para crear una nueva inspección
const NewInspection = (req, res) => {
  const { driver_id, vehicle_id, mileage } = req.body;
  // Validar que todos los campos requeridos estén presentes
  if (!driver_id || !vehicle_id || !mileage) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const newInspectionData = { driver_id, vehicle_id, mileage };

  Inspection.newInspection(newInspectionData, (err, inspection) => {
      if (err) {
          console.error("Error al crear la inspección:", err);
          return res.status(500).json({ error: "Error en el servidor" });
      }
      res.status(201).json(inspection);
  });
};

// Controlador para crear una nueva inspección
const NewVehicleCondition = (req, res) => {
  const dataArray = req.body;

  // Si los datos no están en un array, conviértelos en uno.
  if (!Array.isArray(dataArray)) {
    dataArray = [dataArray];
  }

  Inspection.newVehicleCondition(dataArray, (err, inspection) => {
    if (err) {
      console.error("Error al crear la inspección:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }
    res.status(201).json(inspection);
  });

};





module.exports = {
  getAllInspection, NewInspection, NewVehicleCondition
};
