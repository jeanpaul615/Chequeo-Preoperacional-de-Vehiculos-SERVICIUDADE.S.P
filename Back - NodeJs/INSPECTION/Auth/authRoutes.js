// Importar la biblioteca Express
const express = require('express');
// Crear un router para manejar las rutas
const router = express.Router();
// Importar el controlador de login
const LoginController = require('./loginController');

// Definir las rutas y asignar las funciones del controlador
// Ruta para registrar un nuevo usuario
router.post('/register', LoginController.register);

// Ruta para iniciar sesión
router.post('/login', LoginController.login);

// Ruta para solicitar un restablecimiento de contraseña
router.post('/request-password-reset', LoginController.requestPasswordReset);

// Ruta para restablecer la contraseña
router.post('/reset-password', LoginController.resetPassword);

// Exportar el router para que pueda ser utilizado en otras partes de la aplicación
module.exports = router;
