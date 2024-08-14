const db = require('../../../config/db/connectioninspeccion');

const Users = {
    getAllUsers: (callback) => {
        const query = 'SELECT * FROM user'; 

        db.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }

            callback(null, results); 
        });
    },
};

module.exports = Users;
