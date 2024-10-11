// Importar las dependencias necesarias
const db = require('.././../config/db/connectioninspeccion'); // Conexión a la base de datos
const bcrypt = require('bcrypt'); // Biblioteca para cifrar contraseñas
const jwt = require('jsonwebtoken'); // Biblioteca para manejar tokens JWT
const crypto = require('crypto'); // Biblioteca para generar tokens aleatorios

// Definición del objeto User que contiene métodos relacionados con los usuarios
const User = {
    // Método para verificar si una cédula existe en la base de datos
    checkCedula: (cedula, callback) => {
        const checkCedulaQuery = 'SELECT * FROM user WHERE cedula = ?'; // Consulta SQL para verificar la cédula
        db.query(checkCedulaQuery, [cedula], (err, result) => {
            if (err) {
                return callback(err, null); // Retornar error si ocurre
            }
            callback(null, result.length > 0); // Retorna true si la cédula existe
        });
    },

    // Método para verificar si un correo electrónico existe en la base de datos
    checkEmail: (email, callback) => {
        const checkEmailQuery = 'SELECT * FROM user WHERE email = ?'; // Consulta SQL para verificar el email
        db.query(checkEmailQuery, [email], (err, result) => {
            if (err) {
                return callback(err, null); // Retornar error si ocurre
            }
            callback(null, result.length > 0); // Retorna true si el email existe
        });
    },

    // Método para registrar un nuevo usuario
    register: ({ cedula, email, password, name, role, license_until }, callback) => {
        // Cifrar la contraseña usando bcrypt
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                return callback(err, null); // Retornar error si ocurre
            }
    
            // Insertar el nuevo usuario en la tabla "user"
            const insertUserQuery = 'INSERT INTO user (cedula, email, password, role, status) VALUES (?, ?, ?, ?, ?)';
            db.query(insertUserQuery, [cedula, email, hashedPassword, role, 1], (err, result) => {
                if (err) {
                    return callback(err, null); // Retornar error si ocurre
                }
    
                // Obtener el ID del usuario recién creado
                const userId = result.insertId;
    
                // Insertar los datos del conductor en la tabla "driver" usando el userId generado
                const insertDriverQuery = 'INSERT INTO driver (user_id, name, license_until) VALUES (?, ?, ?)';
                db.query(insertDriverQuery, [userId, name, license_until], (err, driverResult) => {
                    if (err) {
                        return callback(err, null); // Retornar error si ocurre
                    }
    
                    // Retornar un mensaje de éxito con los detalles del registro
                    callback(null, {
                        message: 'Usuario y conductor registrados exitosamente',
                        userId: userId,
                        driverId: driverResult.insertId
                    });
                });
            });
        });
    },
    

    // Método para iniciar sesión
    login: (email, password, callback) => {
        const consult = 'SELECT * FROM user WHERE email = ?'; // Consulta para obtener el usuario por email

        db.query(consult, [email], (err, result) => {
            if (err) {
                return callback(err, null); // Retornar error si ocurre
            }

            if (result.length === 0) {
                return callback(null, { error: 'Usuario o contraseña incorrectos' }); // Retornar error si no existe el usuario
            }

            const user = result[0]; // Obtener el primer resultado (usuario)

            // Verificar la contraseña
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    return callback(err, null); // Retornar error si ocurre
                }

                if (!isMatch) {
                    return callback(null, { error: 'Usuario o contraseña incorrectos' }); // Retornar error si la contraseña no coincide
                }

                // Crear token JWT
                const access_token = jwt.sign({ email: user.email, role: user.role, userId: user.user_id }, "Stack");
                callback(null, { access_token, role: user.role, user_id:user.user_id }); // Retornar el token y datos del usuario
            });
        });
    },

    // Método para solicitar un restablecimiento de contraseña
    requestPasswordReset: (email, callback) => {
        // Generar un token aleatorio
        const token = crypto.randomBytes(20).toString('hex');

        // Guardar el token y su fecha de expiración en la base de datos
        const resetTokenQuery = 'UPDATE user SET reset_token = ?, reset_token_expiration = ? WHERE email = ?';
        const expires = new Date(Date.now() + 7200000).toISOString().slice(0, 19).replace('T', ' '); // 2 horas a partir de ahora
        db.query(resetTokenQuery, [token, expires, email], (err, result) => {
            if (err) {
                return callback(err, null); // Retornar error si ocurre
            }
            callback(null, token); // Retornar el token generado
        });
    },

    // Método para restablecer la contraseña
    resetPassword: (token, password, cedula, callback) => {
        const resetPasswordQuery = 'SELECT * FROM user WHERE reset_token = ? AND reset_token_expiration > ?'; // Consulta para verificar el token
        db.query(resetPasswordQuery, [token, Date.now()], (err, result) => {
            if (err) {
                return callback(err, null); // Retornar error si ocurre
            }
            if (result.length === 0) {
                return callback(null, { error: 'Token inválido o expirado' }); // Retornar error si el token no es válido o ha expirado
            }

            const user = result[0]; // Obtener el primer resultado (usuario)
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    return callback(err, null); // Retornar error si ocurre
                }

                // Actualizar la contraseña y limpiar el token
                const updatePasswordQuery = 'UPDATE user SET password = ?, reset_token = NULL, reset_token_expiration = NULL WHERE cedula = ?';
                db.query(updatePasswordQuery, [hashedPassword, cedula], (err, result) => {
                    if (err) {
                        return callback(err, null); // Retornar error si ocurre
                    }
                    callback(null, { message: 'Contraseña actualizada exitosamente' }); // Retornar mensaje de éxito
                });
            });
        });
    },
};

// Exportar el objeto User para que pueda ser utilizado en otras partes de la aplicación
module.exports = User;
