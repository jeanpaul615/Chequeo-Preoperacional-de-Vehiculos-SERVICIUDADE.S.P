const express = require('express');
const router = express.Router();
const inspectionController = require('./inspectionController'); // Asegúrate de que la ruta es correcta

// Ruta para obtener todos los vehículos
router.get('/', inspectionController.getAllInspection);
router.get('/getinspections', inspectionController.getInspections);
router.post('/getinspectionsbydriver', inspectionController.getInspections);
router.get('/getvehiclecondition', inspectionController.getAllVehicleCondition);
router.post('/getvehicleconditionbyid', inspectionController.getVehicleConditionbyId);



router.post('/newinspection', inspectionController.createInspection);
router.post('/newvehiclecondition', inspectionController.createVehicleCondition);
router.put('/checkedby', inspectionController.UpdateCheckedBy);
router.post('/verifyinspection', inspectionController.VerifyInspection);





module.exports = router;
