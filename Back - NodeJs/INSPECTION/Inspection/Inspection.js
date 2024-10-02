const db = require("../../config/db/connectioninspeccion");

const Inspection = {
  getAllInspection: (callback) => {
    const query = "SELECT * FROM inspection";
    db.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },

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
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  newInspection: (data, callback) => {
    const query = `
      INSERT INTO inspection (driver_id, vehicle_id, mileage) 
      VALUES (?, ?, ?)
    `;
    const { driver_id, vehicle_id, mileage } = data;
    db.query(query, [driver_id, vehicle_id, mileage], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, { inspection_id: results.insertId });
    });
  },

  newVehicleCondition: (data, callback) => {
    const query = `
      INSERT INTO vehicle_condition (inspection_id, name_condition, conditions, comment) 
      VALUES (?, ?, ?, ?)
    `;
    const { inspection_id, name_condition, conditions, comment } = data;
    db.query(
      query,
      [inspection_id, name_condition, conditions, comment],
      (err, results) => {
        if (err) {
          return callback(err, null);
        }
        callback(null, { condition_id: results.insertId });
      }
    );
  },

  getAllVehicleCondition: (callback) => {
    const query = "SELECT * FROM vehicle_condition";
    db.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  getVehicleConditionbyId: (inspection_id,callback) => {
    const query = "SELECT * FROM vehicle_condition WHERE inspection_id = ?";
    db.query(query,inspection_id, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  UpdateAuditChecked: (checked_by, inspection_id, callback) => {
    const query = "UPDATE inspection SET checked_by = ? WHERE inspection_id = ?";
    db.query(query, [checked_by, inspection_id], (err, results) => {
      if(err) {
        return callback(err, null);
      }
      callback(null, results);
    })
  },

  VerifyInspection: (created_at, vehicle_id, callback) => {
    // Usar DATE() para comparar solo la fecha
    const query = "SELECT * FROM inspection WHERE DATE(created_at) = DATE(?) AND vehicle_id = ?";
    db.query(query, [created_at, vehicle_id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },
};




module.exports = Inspection;
