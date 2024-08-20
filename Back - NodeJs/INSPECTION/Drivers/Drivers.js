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
                driver (user_id, name, license_until, seguridad_social_until) 
            VALUES 
                (?, ?, ?, ?)
        `;
        
        const { user_id, name, license_until, seguridad_social_until } = data;
        db.query(query, [user_id, name, license_until, seguridad_social_until], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },
};

module.exports = Driver;
