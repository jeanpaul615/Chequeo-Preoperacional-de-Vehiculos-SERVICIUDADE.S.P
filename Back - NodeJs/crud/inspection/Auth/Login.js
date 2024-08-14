const db = require('../../../config/db/connectioninspeccion');
const jwt = require('jsonwebtoken');

const Login = {
    login: (email, password, callback) => {
        const consult = 'SELECT * FROM user WHERE email = ? AND password = ?';

        db.query(consult, [email, password], (err, result) => {
            if (err) {
                return callback(err, null);
            }

            if (result.length > 0) {
                const access_token = jwt.sign({ email }, "Stack"); 
                callback(null, { access_token });
            } else {
                callback(null, { message: 'Usuario o contraseña incorrectos' });
            }
        });
    },
};

module.exports = Login;
