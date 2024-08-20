const db = require('.././../config/db/connectioninspeccion');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const User = {
    register: ({ email, password }, callback) => {
        // Verificar si el email ya está registrado
        const checkUserQuery = 'SELECT * FROM user WHERE email = ?';
        db.query(checkUserQuery, [email], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            if (result.length > 0) {
                return callback(null, { error: 'El email ya está registrado' });
            }

            // Cifrar la contraseña
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    return callback(err, null);
                }

                // Insertar el nuevo usuario en la base de datos con status = 1 y role = 'USER'
                const insertUserQuery = 'INSERT INTO user (email, password, role, status) VALUES (?, ?, ?, ?)';
                db.query(insertUserQuery, [email, hashedPassword, 'CONDUCTOR', 1], (err, result) => {
                    if (err) {
                        return callback(err, null);
                    }
                    callback(null, { message: 'Usuario registrado exitosamente', userId: result.insertId });
                });
            });
        });
    },
    login: (email, password, callback) => {
        const consult = 'SELECT * FROM user WHERE email = ?';

        db.query(consult, [email], (err, result) => {
            if (err) {
                return callback(err, null);
            }

            if (result.length === 0) {
                return callback(null, { error: 'Usuario o contraseña incorrectos' });
            }

            const user = result[0];

            // Verificar la contraseña
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    return callback(err, null);
                }

                if (!isMatch) {
                    return callback(null, { error: 'Usuario o contraseña incorrectos' });
                }

                // Crear token JWT
                const access_token = jwt.sign({ email: user.email, role: user.role, userId: user.user_id }, "Stack");
                callback(null, { access_token });
            });
        });
    }
};

module.exports = User;
