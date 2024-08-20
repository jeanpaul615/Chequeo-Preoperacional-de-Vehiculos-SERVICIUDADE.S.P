const db = require('../../../config/connection');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado' });
    }

    jwt.verify(token, config.secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        req.user = decoded; // Decodifica y almacena los datos del usuario en `req.user`
        next(); // Continúa con la siguiente función de middleware o la ruta
    });
};

const verifyAdmin = (req, res, next) => {
    const userId = req.user.id; // Obtiene el ID del usuario desde `req.user`

    const consult = 'SELECT role FROM login WHERE id = ?';
    db.query(consult, [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error en la base de datos' });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const userRole = result[0].role;
        if (userRole !== 'admin') {
            return res.status(403).json({ message: 'Acceso denegado' });
        }

        next(); // Continúa con la siguiente función de middleware o la ruta
    });
};

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
    validatePassword, 
    verifyAdmin, 
    verifyToken
};
