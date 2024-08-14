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
};

module.exports = Driver;
