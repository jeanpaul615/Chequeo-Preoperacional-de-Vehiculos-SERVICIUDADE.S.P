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

const createVehicleCondition = async (req, res) => {
  const { inspections } = req.body;

  if (!inspections || !Array.isArray(inspections)) {
    return res.status(400).json({ message: "'inspections' debe ser un array válido" });
  }

  try {
    const insertedConditions = [];

    // Procesar e insertar cada inspección y sus condiciones
    for (const inspection of inspections) {
      const { inspection_id, name_condition, conditions, comment } = inspection;

      // Validar que cada inspección tenga los campos requeridos
      if (!inspection_id || !name_condition || !conditions) {
        return res.status(400).json({ message: "Faltan parámetros requeridos en una de las inspecciones" });
      }

      // Insertar la inspección con su condición
      const newVehicleConditionData = {
        inspection_id,
        name_condition,
        conditions,  // Condición única
        comment
      };

      const insertedCondition = await new Promise((resolve, reject) => {
        Inspection.newVehicleCondition(newVehicleConditionData, (err, vehicleCondition) => {
          if (err) {
            return reject(err);
          }
          resolve(vehicleCondition);
        });
      });

      insertedConditions.push(insertedCondition);
    }

    // Responder con todas las condiciones insertadas
    res.status(201).json({ message: "Todas las inspecciones y condiciones insertadas correctamente", data: insertedConditions });

  } catch (error) {
    console.error("Error al crear las condiciones del vehículo:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};



const getAllVehicleCondition = (req, res) => {
  Inspection.getAllVehicleCondition((err, conditions) => {
    if (err) {
      console.error("Error al obtener las condiciones de cada inspección:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }
    res.json(conditions);
  });
};

const getVehicleConditionbyId = (req, res) =>{
  const {inspection_id } = req.body;

  if(!inspection_id) {
    return res.status(400).json({ message: "Faltan parámetros requeridos" });
  }

  Inspection.getVehicleConditionbyId(inspection_id, (err, condition) => {
    if (err) {
      console.error("Error al obtener la condicion por Id:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }
    res.json(condition);
  });

};
module.exports = {
  getAllInspection,
  createInspection,
  createVehicleCondition,
  getInspections, 
  getAllVehicleCondition,
  getVehicleConditionbyId
};
