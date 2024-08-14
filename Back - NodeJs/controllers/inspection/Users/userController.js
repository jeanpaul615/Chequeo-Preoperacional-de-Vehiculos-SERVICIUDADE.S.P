const Users = require('../../../crud/inspection/Users/Users'); // Importa el módulo correcto

// Controlador para obtener todos los vehículos
const getAllUsers = (req, res) => {
    Users.getAllUsers((err, users) => {
        if (err) {
            console.error('Error al obtener usuarios:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        res.json(users);
    });
};

module.exports = {
    getAllUsers
};
