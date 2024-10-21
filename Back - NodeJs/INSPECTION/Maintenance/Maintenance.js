const db = require("../../config/db/connectioninspeccion");

const Maintenance = {
  //Modelo que obtiene todos los usuarios
  getAllMaintenance: (callback) => {
    const query = "SELECT * FROM maintenance";

    db.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }

      callback(null, results);
    });
  },
  getMaintenanceByLicense: (license_plate, callback) => {
    const query = "SELECT * FROM maintenance WHERE license_plate  = ?";

    db.query(query, [license_plate], (err, results) => {
      if (err) {
        return callback(err, null);
      }

      callback(null, results);
    });
  },

  CreateMaintenance: (data, callback) => {
    const query = `
      INSERT INTO maintenance ( license_plate, inspection_id, driver_name, conditions, comment) 
      VALUES (?, ?, ?, ?, ?)
    `;
    const {license_plate, inspection_id, driver_name, conditions, comment } = data; // Extraer los datos necesarios
    db.query(query, [license_plate, inspection_id, driver_name, conditions, comment], (err, results) => {
      if (err) {
        return callback(err, null); // Manejar errores
      }
      callback(null, results); // Retornar el ID de la nueva condición
    });
  },

  UpdateMaintenance: (id_maintenance, solution, callback) => {
    const query = "UPDATE maintenance SET solution = ? WHERE id_maintenance = ?"; // Consulta SQL para actualizar el auditor
    db.query(query, [solution, id_maintenance], (err, results) => {
      if (err) {
        return callback(err, null); // Manejar errores
      }
      callback(null, results); // Retornar resultados de la actualización
    });
  },
}

module.exports = Maintenance;