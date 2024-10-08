const express = require('express');
const router = express.Router();
const inspectionController = require('./inspectionController'); // Asegúrate de que la ruta es correcta

//Ruta para obtener todas las inspecciones
router.get('/', inspectionController.getAllInspection);
//Ruta para obtener todas las inspecciones haciendo un join para mostrarlo en el datatable
router.get('/getinspections', inspectionController.getInspections);
//Ruta post para obtener las inspecciones de un conductor en especifico
router.post('/getinspectionsbydriver', inspectionController.getInspections);
//Ruta para obtener todas las condiciones de vehiculo basado en una inspección
router.get('/getvehiclecondition', inspectionController.getAllVehicleCondition);
//Ruta post para obtener las condiciones de vehiculo por id
router.post('/getvehicleconditionbyid', inspectionController.getVehicleConditionbyId);


//Ruta post para crear una nueva inspección
router.post('/newinspection', inspectionController.createInspection);
//Ruta para crear una nueva condicion de vehiculo enlazada a una inspección
router.post('/newvehiclecondition', inspectionController.createVehicleCondition);
//Ruta put para actualizar quien chequea cada inspeccion
router.put('/checkedby', inspectionController.UpdateCheckedBy);
//Ruta post para verificar si existe una inspección
router.post('/verifyinspection', inspectionController.VerifyInspection);





module.exports = router;
