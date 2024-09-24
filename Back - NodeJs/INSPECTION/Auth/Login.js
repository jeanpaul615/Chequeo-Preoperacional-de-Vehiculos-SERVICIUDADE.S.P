const db = require('.././../config/db/connectioninspeccion');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); // Asegúrate de que esta línea esté presente


const User = {
    checkCedula: (cedula, callback) => {
        const checkCedulaQuery = 'SELECT * FROM user WHERE cedula = ?';
        db.query(checkCedulaQuery, [cedula], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result.length > 0); // Retorna true si la cédula existe
        });
    },

    checkEmail: (email, callback) => {
        const checkEmailQuery = 'SELECT * FROM user WHERE email = ?';
        db.query(checkEmailQuery, [email], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result.length > 0); // Retorna true si el email existe
        });
    },

    register: ({ cedula, email, password }, callback) => {
        // Cifrar la contraseña
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                return callback(err, null);
            }

            // Insertar el nuevo usuario en la base de datos con status = 1 y role = 'CONDUCTOR'
            const insertUserQuery = 'INSERT INTO user (cedula, email, password, role, status) VALUES (?, ?, ?, ?, ?)';
            db.query(insertUserQuery, [cedula, email, hashedPassword, 'CONDUCTOR', 1], (err, result) => {
                if (err) {
                    return callback(err, null);
                }
                callback(null, { message: 'Usuario registrado exitosamente', userId: result.insertId });
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
    },


    requestPasswordReset: (email, callback) => {
        // Generar un token aleatorio
        const token = crypto.randomBytes(20).toString('hex');

        // Guardar el token y su fecha de expiración en la base de datos
        const resetTokenQuery = 'UPDATE user SET reset_token = ?, reset_token_expiration = ? WHERE email = ?';
        const expires = new Date(Date.now() + 7200000).toISOString().slice(0, 19).replace('T', ' '); // 2 horas a partir de ahora
        db.query(resetTokenQuery, [token, expires, email], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, token);
        });
    },

    resetPassword: (token, password, cedula, callback) => {
        const resetPasswordQuery = 'SELECT * FROM user WHERE reset_token = ? AND reset_token_expiration > ?';
        db.query(resetPasswordQuery, [token, Date.now()], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            if (result.length === 0) {
                return callback(null, { error: 'Token inválido o expirado' });
            }

            const user = result[0];
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    return callback(err, null);
                }

                // Actualizar la contraseña y limpiar el token
                const updatePasswordQuery = 'UPDATE user SET password = ?, reset_token = NULL, reset_token_expiration = NULL WHERE cedula = ?';
                db.query(updatePasswordQuery, [hashedPassword, cedula], (err, result) => {
                    if (err) {
                        return callback(err, null);
                    }
                    callback(null, { message: 'Contraseña actualizada exitosamente' });
                });
            });
        });
    },

};

module.exports = User;