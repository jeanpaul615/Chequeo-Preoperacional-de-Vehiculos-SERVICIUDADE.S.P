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
//Controlador que obtiene todas las inspecciones haciendo un innerjoin para consumir todos los nombre necesarios para la tabla
const getInspections = (req, res) => {
  Inspection.getInspectionJoin((err, inspections) => {
    if (err) {
      console.error("Error al obtener las inspecciones:", err);//Manejo de errores por servidor
      return res.status(500).json({ error: "Error en el servidor" });
    }
    res.json(inspections); //restorna las inspecciones formato JSON
  });
};

// Controlador para obtener Inspecciones basada en conductor.
const getInspectionsByDriver = (req, res) => {
  const { driver_id } = req.body;
  if(!driver_id){
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });//Manejo de errores por falta de parametros
  }
  //
  Inspection.getInspectionByDriver(driver_id, (err, inspections) => {
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
//Controlador para crear una nueva condicion de vehiculo.
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


//Controlador para obtener las condiciones de los vehiculos
const getAllVehicleCondition = (req, res) => {
  Inspection.getAllVehicleCondition((err, conditions) => {
    if (err) {
      console.error("Error al obtener las condiciones de cada inspección:", err);//Manejo de errores de consulta o servidor
      return res.status(500).json({ error: "Error en el servidor" });
    }
    res.json(conditions);//Respuesta formato JSON por 
  });
};

//Controlador para obtener las  condiciones de un vehiculo basado en su ID
const getVehicleConditionbyId = (req, res) => {
  const {inspection_id } = req.body;
  //Condicional para verificar que si este el parametro necesario
  if(!inspection_id) {
    return res.status(400).json({ message: "Faltan parámetros requeridos" });//Respuesta de estado de servidor si faltan parametros 
  }
  //Llamado al modelo de para traer las condiciones del vehiculo con una consulta SQL
  Inspection.getVehicleConditionbyId(inspection_id, (err, condition) => {
    if (err) {
      console.error("Error al obtener la condicion por Id:", err);
      return res.status(500).json({ error: "Error en el servidor" });//Manejo de errores del servidor
    }
    res.json(condition);//Si todo sale bien que de respuesta en modo JSON
  });
};
//Controlador para chequear las inspecciones
const UpdateCheckedBy = (req, res) => {
  const {checked_by, inspection_id} = req.body; //parametros requeridos en el body

  if(!checked_by || !inspection_id){
    return res.status(400).json({ message: "Faltan parámetros requeridos" });//Manejo de parametros faltantes
  }

  Inspection.UpdateAuditChecked(checked_by, inspection_id, (err, checked_by) =>{
    if (err) {
      console.error("Error al auditar el chequeo:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }
    res.json(checked_by);
  });  
};
//Controlador para verificar si la inspeccion ya existe
const VerifyInspection = (req, res) => {
  const { created_at, vehicle_id } = req.body;

  // Validar parámetros requeridos
  if (!created_at || !vehicle_id) {
    return res.status(400).json({ message: "Faltan parámetros requeridos" });
  }

  // Verificar la inspección solo con la fecha
  Inspection.VerifyInspection(created_at, vehicle_id, (err, results) => {
    if (err) {
      console.error("Error al verificar inspección:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }

    // Comprobar si se encontraron resultados
    if (results.length > 0) {
      return res.status(200).json({ message: "Inspección ya existe", inspections: results });
    } else {
      return res.status(200).json({ message: "No se encontraron inspecciones" });
    }
  });
};
//Exporta todos los controladores para ser usados como rutas
module.exports = {
  getAllInspection,
  getInspectionsByDriver,
  createInspection,
  createVehicleCondition,
  getInspections, 
  getAllVehicleCondition,
  getVehicleConditionbyId,
  UpdateCheckedBy,
  VerifyInspection
};
