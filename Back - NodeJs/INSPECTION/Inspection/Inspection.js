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
      INSERT INTO vehicle_condition (inspection_id, conditions, comment) 
      VALUES (?, ?, ?)
    `;
    const { inspection_id, conditions, comment } = data;
    db.query(
      query,
      [inspection_id, JSON.stringify(conditions), comment],
      (err, results) => {
        if (err) {
          return callback(err, null);
        }
        callback(null, { condition_id: results.insertId });
      }
    );
  },
};

module.exports = Inspection;
