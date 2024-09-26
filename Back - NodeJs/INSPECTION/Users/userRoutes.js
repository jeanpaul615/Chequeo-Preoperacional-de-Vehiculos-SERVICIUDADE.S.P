const express = require('express');
const router = express.Router();
const usersController = require('./userController'); // Asegúrate de que la ruta es correcta

// Ruta para obtener todos los vehículos
router.get('/', usersController.getAllUsers);
router.get('/getuser', usersController.getUsers);
router.post('/getuserbyid', usersController.getUserById);
router.put('/updateuser', usersController.UpdateUser);
router.post('/deleteuser', usersController.DeleteUser);


module.exports = router;
