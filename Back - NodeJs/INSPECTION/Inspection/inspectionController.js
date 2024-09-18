const Inspection = require("./Inspection");

// Controlador para obtener todas las inspecciones
const getAllInspection = (req, res) => {
  Inspection.getAllInspection((err, inspections) => {
    if (err) {
      console.error("Error al obtener las inspecciones:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }
    res.json(inspections);
  });
};

const getInspections = (req, res) => {
  Inspection.getInspectionJoin((err, inspections) => {
    if (err) {
      console.error("Error al obtener las inspecciones:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }
    res.json(inspections);
  });
};

// Controlador para crear una nueva inspección
const createInspection = (req, res) => {
  const { driver_id, vehicle_id, mileage } = req.body;
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

// Controlador para crear una nueva condición del vehículo
const createVehicleCondition = (req, res) => {
  const { inspection_id, conditions, comment } = req.body;

  if (!inspection_id || !conditions || !comment) {
    return res.status(400).json({ message: "Faltan parámetros requeridos" });
  }

  // Asegúrate de que `conditions` sea procesado correctamente si es necesario
  const newVehicleConditionData = { inspection_id, conditions, comment };

  Inspection.newVehicleCondition(newVehicleConditionData, (err, vehicleCondition) => {
    if (err) {
      console.error("Error al crear la condición del vehículo:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }
    res.status(201).json(vehicleCondition);
  });
};

module.exports = {
  getAllInspection,
  createInspection,
  createVehicleCondition,
  getInspections
};
