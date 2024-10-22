const path = require("path");
const fs = require("fs");
const multer = require("multer");
const SheetMaintenanceQueries = require("./SheetMaintenance");

// Configuración de multer para cargar el archivo Excel
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/excels");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const vehicleId = req.body.license_plate; // Obtener el license_plate del cuerpo de la solicitud
    cb(null, `${vehicleId}_${Date.now()}${ext}`); // Nuevo nombre de archivo
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    file.mimetype === "application/vnd.ms-excel"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten archivos Excel"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter }).single(
  "excel"
);

// Controlador para crear una hoja de mantenimiento y subir archivo Excel
const createSheetMaintenance = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });

    const { license_plate } = req.body;
    if (!license_plate)
      return res
        .status(400)
        .json({ error: "El campo license_plate es obligatorio" });
    if (!req.file)
      return res
        .status(400)
        .json({ error: "No se ha subido ningún archivo Excel" });

    const fileUrl = `/public/excels/${req.file.filename}`;

    SheetMaintenanceQueries.createSheetMaintenance(
      license_plate,
      fileUrl,
      (error, result) => {
        if (error)
          return res
            .status(500)
            .json({
              error: "Error en el servidor al crear la hoja de mantenimiento",
            });
        res
          .status(201)
          .json({
            message: "Hoja de mantenimiento creada exitosamente",
            data: result,
          });
      }
    );
  });
};

const downloadExcel = (req, res) => {
  const { id_maintenance } = req.body;

  SheetMaintenanceQueries.getMaintenanceUrlById(
    id_maintenance,
    (err, result) => {
      if (err || result.length === 0) {
        return res
          .status(404)
          .json({ error: "No se encontró la hoja de mantenimiento" });
      }

      const filePath = path.join(__dirname, "../..", result[0].url);

      // Verifica si el archivo existe
      if (!fs.existsSync(filePath)) {
        console.error("File not found:", filePath); // Mensaje de error si no se encuentra el archivo
        return res
          .status(404)
          .json({ error: "Archivo no encontrado en el servidor" });
      }

      // Intenta descargar el archivo
      res.download(filePath, (downloadError) => {
        if (downloadError) {
          console.error("Error downloading the file:", downloadError); // Mensaje de error si hay un problema al descargar
          return res
            .status(500)
            .json({ error: "Error al descargar el archivo" });
        }
      });
    }
  );
};

const updateMaintenance = (req, res) => {
  // Subir nuevo archivo Excel
  upload(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });

    const { id_maintenance, license_plate } = req.body;

    // Validaciones
    if (!id_maintenance)
      return res
        .status(400)
        .json({ error: "El campo id_maintenance es obligatorio" });
    if (!license_plate)
      return res
        .status(400)
        .json({ error: "El campo license_plate es obligatorio" });
    if (!req.file)
      return res
        .status(400)
        .json({ error: "No se ha subido ningún archivo Excel" });

    // Obtener la URL del archivo existente en la base de datos
    SheetMaintenanceQueries.getMaintenanceUrlById(
      id_maintenance,
      (err, result) => {
        if (err || result.length === 0) {
          return res
            .status(404)
            .json({ error: "No se encontró la hoja de mantenimiento" });
        }

        const oldFilePath = path.join(__dirname, "../..", result[0].url);

        // Verificar si el archivo antiguo existe y eliminarlo
        if (fs.existsSync(oldFilePath)) {
          try {
            fs.unlinkSync(oldFilePath);
          } catch (unlinkErr) {
            return res
              .status(500)
              .json({ error: "Error al eliminar el archivo antiguo" });
          }
        }

        // Generar la nueva URL del archivo
        const newFileUrl = `/public/excels/${req.file.filename}`;
        console.log("URL que se guardará en la BD:", newFileUrl);

        // Guardar la nueva URL en la base de datos
        SheetMaintenanceQueries.updateMaintenance(
          id_maintenance,
          newFileUrl,
          (err, result) => {
            if (err)
              return res
                .status(500)
                .json({
                  error: "Error al actualizar la hoja de mantenimiento",
                });

            res
              .status(200)
              .json({
                message: "Hoja de mantenimiento actualizada exitosamente",
                data: result,
              });
          }
        );
      }
    );
  });

};

const getMaintenance = (req, res) => {
  SheetMaintenanceQueries.getMaintenance((err, result) => {
    if (err) {
      console.error("Error al obtener matenimientos:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }
    res.json(result);
  });
};


module.exports = {
  createSheetMaintenance,
  downloadExcel,
  updateMaintenance,
  getMaintenance
};
