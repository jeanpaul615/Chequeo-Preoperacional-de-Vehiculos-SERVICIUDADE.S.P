const Maintenance = require("./Maintenance");

const getAllMaintenance = (req, res) => {
    Maintenance.getAllMaintenance((err, result) => {
      if (err) {
        console.error("Error al obtener usuarios:", err);
        return res.status(500).json({ error: "Error en el servidor" });
      }
      res.json(result);
    });
  };

  const getMaintenanceByLicense = (req, res) => {
    const {license_plate} = req.body;
    Maintenance.getMaintenanceByLicense(license_plate,(err, result) => {
      if (err) {
        console.error("Error al obtener usuarios:", err);
        return res.status(500).json({ error: "Error en el servidor" });
      }
      res.json(result);
    });
  };

  const CreateMaintenance = (req, res) => {
    const { license_plate, inspection_id, driver_name, conditions, comment } = req.body;
    if (!license_plate || !inspection_id || !driver_name || !conditions || !comment) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
  
    const newMaintenanceData = { license_plate, inspection_id, driver_name, conditions, comment };
  
    Maintenance.CreateMaintenance(newMaintenanceData, (err, inspection) => {
      if (err) {
        console.error("Error al crear la inspección:", err);
        return res.status(500).json({ error: "Error en el servidor" });
      }
      res.status(201).json(inspection);
    });
  };

  const UpdateMaintenance = (req, res) => {
    const {id_maintenance, solution} = req.body; //parametros requeridos en el body
  
    if(!id_maintenance || !solution){
      return res.status(400).json({ message: "Faltan parámetros requeridos" });//Manejo de parametros faltantes
    }
  
    Maintenance.UpdateMaintenance(id_maintenance, solution, (err, result) =>{
      if (err) {
        console.error("Error al solucionar:", err);
        return res.status(500).json({ error: "Error en el servidor" });
      }
      res.status(201).json(result);
    });  
  };


  module.exports = {
  getAllMaintenance,
  getMaintenanceByLicense,
  CreateMaintenance, 
  UpdateMaintenance
  };
  