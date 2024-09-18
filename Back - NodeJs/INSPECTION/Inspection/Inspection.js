const db = require('../../config/db/connectioninspeccion');

const Inspection = {
  getAllInspection: (callback) => {
    const query = 'SELECT * FROM inspection';
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
    db.query(query, [inspection_id, JSON.stringify(conditions), comment], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, { condition_id: results.insertId });
    });
  },
};

module.exports = Inspection;
