const path = require("path");
const fs = require("fs");
const multer = require("multer");
const SheetMaintenanceQueries = require("./SheetMaintenance");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
    "application/vnd.ms-excel", // .xls
    "application/xlsx", // Variante para .xlsx
    "text/csv", // .csv, si deseas permitirlo
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Acepta el archivo
  } else {
    cb(new Error("Tipo de archivo no permitido"), false); // Rechaza el archivo
  }
};



const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
}).single("excel");

const createSheetMaintenance = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });

    const { license_plate } = req.body;

    // Validar la placa
    if (!license_plate) {
      // Si no hay licencia, elimina el archivo subido
      if (req.file) {
        fs.unlink(req.file.path, (unlinkError) => {
          if (unlinkError) {
            console.error("Error al eliminar el archivo subido:", unlinkError);
          }
        });
      }
      return res.status(400).json({ error: "El campo license_plate es obligatorio" });
    }

    // Verificar si se subió un archivo
    if (!req.file) {
      return res.status(400).json({ error: "No se ha subido ningún archivo Excel" });
    }

    const url = `/public/${req.file.filename}`;

    // Intentar crear la hoja de mantenimiento
    SheetMaintenanceQueries.createSheetMaintenance(license_plate, url, (error, result) => {
      if (error) {
        console.error("Error en la consulta a la base de datos:", error); // Log para errores de base de datos
        
        // Eliminar el archivo si hay un error en la base de datos
        fs.unlink(req.file.path, (unlinkError) => {
          if (unlinkError) {
            console.error("Error al eliminar el archivo subido:", unlinkError);
          }
        });

        return res.status(500).json({ error: "Error en el servidor al crear la hoja de mantenimiento" });
      }
      res.status(201).json({ message: "Hoja de mantenimiento creada exitosamente", data: result });
    });
  });
};

const downloadExcel = (req, res) => {
  const { id_maintenance } = req.body;

  SheetMaintenanceQueries.getMaintenanceUrlById(id_maintenance, (err, result) => {
    if (err || result.length === 0) {
      return res.status(404).json({ error: "No se encontró la hoja de mantenimiento" });
    }

    const filePath = path.join(__dirname, "../..", result[0].url);

    // Verifica si el archivo existe
    if (!fs.existsSync(filePath)) {
      console.error("File not found:", filePath); // Mensaje de error si no se encuentra el archivo
      return res.status(404).json({ error: "Archivo no encontrado en el servidor" });
    }

    // Intenta descargar el archivo
    res.download(filePath, (downloadError) => {
      if (downloadError) {
        console.error("Error downloading the file:", downloadError); // Mensaje de error si hay un problema al descargar
        return res.status(500).json({ error: "Error al descargar el archivo" });
      }
    });
  });
};

const updateMaintenance = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });

    const { id_maintenance, license_plate } = req.body;

    // Validaciones
    if (!id_maintenance) {
      // Si no hay id, elimina el archivo subido
      if (req.file) {
        fs.unlink(req.file.path, (unlinkError) => {
          if (unlinkError) {
            console.error("Error al eliminar el archivo subido:", unlinkError);
          }
        });
      }
      return res.status(400).json({ error: "El campo id_maintenance es obligatorio" });
    }
    if (!license_plate) {
      // Si no hay licencia, elimina el archivo subido
      if (req.file) {
        fs.unlink(req.file.path, (unlinkError) => {
          if (unlinkError) {
            console.error("Error al eliminar el archivo subido:", unlinkError);
          }
        });
      }
      return res.status(400).json({ error: "El campo license_plate es obligatorio" });
    }
    if (!req.file) {
      return res.status(400).json({ error: "No se ha subido ningún archivo Excel" });
    }

    // Obtener la URL del archivo existente en la base de datos
    SheetMaintenanceQueries.getMaintenanceUrlById(id_maintenance, (err, result) => {
      if (err || result.length === 0) {
        // Si ocurre un error en la consulta, elimina el archivo subido
        if (req.file) {
          fs.unlink(req.file.path, (unlinkError) => {
            if (unlinkError) {
              console.error("Error al eliminar el archivo subido:", unlinkError);
            }
          });
        }
        return res.status(404).json({ error: "No se encontró la hoja de mantenimiento" });
      }

      const oldFilePath = path.join(__dirname, "../..", result[0].url);

      // Verificar si el archivo antiguo existe y eliminarlo
      if (fs.existsSync(oldFilePath)) {
        try {
          fs.unlinkSync(oldFilePath);
        } catch (unlinkErr) {
          // Eliminar el nuevo archivo si hay un error al eliminar el antiguo
          fs.unlink(req.file.path, (unlinkError) => {
            if (unlinkError) {
              console.error("Error al eliminar el archivo subido:", unlinkError);
            }
          });
          return res.status(500).json({ error: "Error al eliminar el archivo antiguo" });
        }
      }

      // Generar la nueva URL del archivo
      const newFileUrl = `/public/${req.file.filename}`;
      // Guardar la nueva URL en la base de datos
      SheetMaintenanceQueries.updateMaintenance(id_maintenance, newFileUrl, (err, result) => {
        if (err) {
          // Si ocurre un error, eliminar el nuevo archivo
          fs.unlink(req.file.path, (unlinkError) => {
            if (unlinkError) {
              console.error("Error al eliminar el archivo subido:", unlinkError);
            }
          });
          return res.status(500).json({ error: "Error al actualizar la hoja de mantenimiento" });
        }

        res.status(200).json({ message: "Hoja de mantenimiento actualizada exitosamente", data: result });
      });
    });
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
  getMaintenance,
};
