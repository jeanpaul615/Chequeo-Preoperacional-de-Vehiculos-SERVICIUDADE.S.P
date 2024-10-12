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
}

module.exports = Maintenance;