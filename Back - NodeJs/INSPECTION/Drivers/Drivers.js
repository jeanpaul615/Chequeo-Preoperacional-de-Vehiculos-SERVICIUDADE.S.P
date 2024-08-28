const db = require('../../config/db/connectioninspeccion');

const Driver = {
    getAllDrivers: (callback) => {
        const query = 'SELECT * FROM driver'; 

        db.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }

            callback(null, results); 
        });
    },
    NewDriverRegister: (data, callback) => {
        const query = `
            INSERT INTO 
                driver (user_id, name, license_until) 
            VALUES 
                (?, ?, ?)
        `;
        
        const { user_id, name, license_until,  } = data;
        db.query(query, [user_id, name, license_until], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },
    UpdateDriver: (data, callback) => {
        const query = `
          UPDATE driver
          SET 
            name = ?,
            license_until = ?
          WHERE
            user_id = ?`
      
        const { name, license_until,  user_id } = data;
      
        db.query(
          query,
          [name, license_until, user_id],
          (err, results) => {
            if (err) {
              return callback(err, null);
            }
            callback(null, results);
          }
        );
      },
};

module.exports = Driver;
