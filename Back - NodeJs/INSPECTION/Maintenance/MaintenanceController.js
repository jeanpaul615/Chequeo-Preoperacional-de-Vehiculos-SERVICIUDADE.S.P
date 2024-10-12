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




  module.exports = {
  getAllMaintenance,
  getMaintenanceByLicense
  };
  