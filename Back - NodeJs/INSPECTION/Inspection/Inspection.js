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
};

module.exports = Inspection;
