const db = require('../../../config/connection');

const checkIfUserExists = (username, callback) => {
    const consult = 'SELECT * FROM login WHERE username = ?';
    db.query(consult, [username], (err, result) => {
        if (err) {
            return callback(err, null);
        }

        if (result.length > 0) {
            return callback(null, true); // Usuario existe
        }

        callback(null, false); // Usuario no existe
    });
};

const validateUserData = (username) => {
    if (typeof username !== 'string') {
        return 'El nombre de usuario debe ser una cadena de texto';
    }

    if (!username) {
        return 'Por favor inserte un usuario';
    }

    if (username.length < 4) {
        return 'El usuario debe tener al menos 4 caracteres';
    }

    return null; // Usuario válido
};

const validatePassword = (password) => {
    if (typeof password !== 'string') {
        return 'La contraseña debe ser una cadena de texto';
    }

    if (!password) {
        return 'Por favor inserte una contraseña';
    }

    if (password.length < 6) { // Corregido a 6 caracteres según tu comentario
        return 'La contraseña debe tener al menos 6 caracteres';
    }

    return null; // Contraseña válida
};

module.exports = {
    checkIfUserExists,
    validateUserData,
    validatePassword
};
