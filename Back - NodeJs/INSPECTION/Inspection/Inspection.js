// Importar la conexión a la base de datos
const db = require("../../config/db/connectioninspeccion");

// Definición del modelo de Inspección
const Inspection = {
  // Obtener todas las inspecciones
  getAllInspection: (callback) => {
    const query = "SELECT * FROM inspection"; // Consulta SQL para seleccionar todas las inspecciones
    db.query(query, (err, results) => {
      if (err) {
        return callback(err, null); // Manejar errores
      }
      callback(null, results); // Retornar los resultados
    });
  },

  // Obtener inspecciones junto con los datos de conductores y vehículos
  getInspectionJoin: (callback) => {
    const query = `
    SELECT 
        i.inspection_id,
        i.mileage,
        i.checked_by,
        i.created_at,
        d.name AS driver_name,
        v.license_plate
    FROM 
        INSPECTION i
    INNER JOIN 
        DRIVER d ON i.driver_id = d.driver_id
    INNER JOIN 
        VEHICLE v ON i.vehicle_id = v.vehicle_id;
`;
    db.query(query, (err, results) => {
      if (err) {
        return callback(err, null); // Manejar errores
      }
      callback(null, results); // Retornar los resultados
    });
  },

  // Obtener inspecciones por ID de conductor
  getInspectionByDriver: (data, callback) => {
    const query = `
    SELECT 
        i.inspection_id,
        i.mileage,
        i.checked_by,
        i.created_at,
        d.name AS driver_name,
        v.license_plate
    FROM 
        INSPECTION i
    INNER JOIN 
        DRIVER d ON i.driver_id = d.driver_id
    INNER JOIN 
        VEHICLE v ON i.vehicle_id = v.vehicle_id;
`;
    const { driver_id } = data; // Extraer el ID del conductor de los datos

    db.query(query, driver_id, (err, results) => {
      if (err) {
        return callback(err, null); // Manejar errores
      }
      callback(null, results); // Retornar los resultados
    });
  },

  // Registrar una nueva inspección
  newInspection: (data, callback) => {
    const query = `
      INSERT INTO inspection (driver_id, vehicle_id, mileage) 
      VALUES (?, ?, ?)
    `;
    const { driver_id, vehicle_id, mileage } = data; // Extraer los datos necesarios
    db.query(query, [driver_id, vehicle_id, mileage], (err, results) => {
      if (err) {
        return callback(err, null); // Manejar errores
      }
      callback(null, { inspection_id: results.insertId }); // Retornar el ID de la nueva inspección
    });
  },

  // Registrar una nueva condición del vehículo
  newVehicleCondition: (data, callback) => {
    const query = `
      INSERT INTO vehicle_condition (inspection_id, name_condition, conditions, comment) 
      VALUES (?, ?, ?, ?)
    `;
    const { inspection_id, name_condition, conditions, comment } = data; // Extraer los datos necesarios
    db.query(query, [inspection_id, name_condition, conditions, comment], (err, results) => {
      if (err) {
        return callback(err, null); // Manejar errores
      }
      callback(null, { condition_id: results.insertId }); // Retornar el ID de la nueva condición
    });
  },

  // Obtener todas las condiciones de los vehículos
  getAllVehicleCondition: (callback) => {
    const query = "SELECT * FROM vehicle_condition"; // Consulta SQL para seleccionar todas las condiciones
    db.query(query, (err, results) => {
      if (err) {
        return callback(err, null); // Manejar errores
      }
      callback(null, results); // Retornar los resultados
    });
  },

  // Obtener condición de vehículo por ID de inspección
  getVehicleConditionbyId: (inspection_id, callback) => {
    const query = "SELECT * FROM vehicle_condition WHERE inspection_id = ?"; // Consulta SQL para obtener condiciones por ID
    db.query(query, inspection_id, (err, results) => {
      if (err) {
        return callback(err, null); // Manejar errores
      }
      callback(null, results); // Retornar los resultados
    });
  },

  // Actualizar el auditor que realizó la verificación
  UpdateAuditChecked: (checked_by, inspection_id, callback) => {
    const query = "UPDATE inspection SET checked_by = ? WHERE inspection_id = ?"; // Consulta SQL para actualizar el auditor
    db.query(query, [checked_by, inspection_id], (err, results) => {
      if (err) {
        return callback(err, null); // Manejar errores
      }
      callback(null, results); // Retornar resultados de la actualización
    });
  },

  // Verificar la inspección por fecha y ID de vehículo
  VerifyInspection: (created_at, vehicle_id, callback) => {
    // Usar DATE() para comparar solo la fecha
    const query = "SELECT * FROM inspection WHERE DATE(created_at) = DATE(?) AND vehicle_id = ?"; // Consulta SQL para verificar
    db.query(query, [created_at, vehicle_id], (err, results) => {
      if (err) {
        return callback(err, null); // Manejar errores
      }
      callback(null, results); // Retornar los resultados
    });
  },
};

// Exportar el modelo de Inspección
module.exports = Inspection;
