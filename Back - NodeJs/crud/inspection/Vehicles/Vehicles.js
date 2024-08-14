const db = require('../../../config/db/connectioninspeccion');

const Vehicle = {
    getAllVehicles: (callback) => {
        const query = 'SELECT * FROM vehicle'; 

        db.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }

            callback(null, results); 
        });
    },
};

module.exports = Vehicle;
