// routes.js

const express = require('express');
const router = express.Router();
const maintenanceController = require('./SheetMaintenanceController');

router.use(express.json());
router.use('/public', express.static('public'));

// Crear una nueva hoja de mantenimiento y cargar un archivo Excel
router.post('/createmaintenance', maintenanceController.createSheetMaintenance);

// Descargar un archivo Excel asociado a una hoja de mantenimiento
router.get('/download', maintenanceController.downloadExcel);

router.get('/getmaintenance', maintenanceController.getMaintenance);


// Actualizar una hoja de mantenimiento con una solución
router.post('/updatemaintenance', maintenanceController.updateMaintenance);

module.exports = router;
