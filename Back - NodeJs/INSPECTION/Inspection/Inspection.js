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
            // Retornar el ID de la nueva inspección
            callback(null, { inspection_id: results.insertId });
        });
    },
    newVehicleCondition: (dataArray, callback) => {
        // Verificar que dataArray sea un array
        if (!Array.isArray(dataArray)) {
          return callback(new Error("dataArray is not an array"), null);
        }
      
        let values = [];
        let query = 'INSERT INTO vehicle_condition (inspection_id, parameter_id,  `condition`, comment) VALUES';
      
        // Construir los valores dinámicamente
        dataArray.forEach((data, index) => {
          values.push(data.inspection_id, data.parameter_id, data.condition, data.comment);
          query += '(?, ?, ?, ?)';
      
          // Añadir coma para separar las filas, excepto en la última
          if (index !== dataArray.length - 1) {
            query += ", ";
          }
        });
      
        // Ejecutar la consulta dentro de una transacción para mayor seguridad
        db.beginTransaction((err) => {
          if (err) {
            return callback(err, null);
          }
      
          db.query(query, values, (err, results) => {
            if (err) {
              return db.rollback(() => callback(err, null));
            }
      
            db.commit((err) => {
              if (err) {
                return db.rollback(() => callback(err, null));
              }
              callback(null, results);
            });
          });
        });
      },
};

module.exports = Inspection;
