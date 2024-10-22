// sheetMaintenanceQueries.js

const db = require("../../config/db/connectioninspeccion");

const SheetMaintenanceQueries = {
  // Insertar nueva hoja de mantenimiento
  createSheetMaintenance: (license_plate, fileUrl, callback) => {
    const query = `INSERT INTO sheetmaintenance (license_plate, url) VALUES (?, ?)`;
    db.query(query, [license_plate, fileUrl], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  },


  createSheetMaintenance: (license_plate, fileUrl, callback) => {
    const query = `INSERT INTO sheetmaintenance (license_plate, url) VALUES (?, ?)`;
    db.query(query, [license_plate, fileUrl], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  },


  // Obtener la URL del archivo para descargar
  getMaintenanceUrlById: (id_maintenance, callback) => {
    const query = `SELECT url FROM sheetmaintenance WHERE id_maintenance = ?`;
    db.query(query, [id_maintenance], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  },

  updateMaintenance: (id_maintenance, url, callback) => {
    const query = `UPDATE sheetmaintenance SET url = ? WHERE id_maintenance = ?`;
    db.query(query, [url, id_maintenance], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  },
};

module.exports = SheetMaintenanceQueries;
