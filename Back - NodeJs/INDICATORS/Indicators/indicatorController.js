const Indicator = require("./Indicators"); // Importa el módulo correcto

// Controlador para obtener todos los indicadores
const getIndicators = (req, res) => {
  Indicator.getIndicators((err, indicators) => {
    if (err) {
      console.error("Error al obtener indicadores:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }
    res.json(indicators);
  });
};

// Controlador para obtener todos los indicadores
// Controlador para obtener todos los indicadores con paginación
const getAllIndicators = (req, res) => {
  // Obtén los parámetros de paginación de la solicitud
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 1000;
  const offset = (page - 1) * limit;

  Indicator.getAllIndicatorsPaginated(offset, limit, (err, indicators) => {
    if (err) {
      console.error("Error al obtener indicadores:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }
    res.json(indicators);
  });
};
//Controlador para registrar un nuevo indicador
const registerIndicator = (req, res) => {
  const { indicador_id, valor, periodo_inicio } = req.body;

  if (!indicador_id || !valor || !periodo_inicio) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const newIndicatorData = {
    indicador_id,
    valor,
    periodo_inicio,
  };

  Indicator.NewIndicatorRegister(newIndicatorData, (err, result) => {
    if (err) {
      console.error("Error al registrar nuevo indicador:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }
    res
      .status(201)
      .json({
        message: "Nuevo indicador registrado con éxito",
        id: result.insertId,
      });
  });
};
//Controlador para verificar si ya existe un Indicador con el id y periodo, evitando duplicidad al ingresar registros
const VerifyIndicator = (req, res) => {
  const { indicador_id, periodo_inicio } = req.body;

  if (!indicador_id || !periodo_inicio) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const newIndicatorData = {
    indicador_id,
    periodo_inicio,
  };

  Indicator.VerifyIndicator(newIndicatorData, (err, exists) => {
    if (err) {
      console.error("Error al verificar indicador:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }

    if (exists) {
      return res
        .status(200)
        .json({ exists: true, message: "Indicador existente" });
    } else {
      return res
        .status(200)
        .json({ exists: false, message: "Indicador no encontrado" });
    }
  });
};

//Controlador para actualizar el indicador basado en el id y periodo de inicio, se modifica el valor del indicador.
const UpdateIndicator = (req, res) => {
  const { indicador_id, valor, periodo_inicio } = req.body;

  if (!indicador_id || !periodo_inicio || !valor) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const updateIndicatorData = {
    indicador_id,
    valor,
    periodo_inicio,
  };

  Indicator.UpdateIndicator(updateIndicatorData, (err, result) => {
    if (err) {
      console.error("Error al actualizar el indicador:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }


    res
      .status(200)
      .json({
        message: "Indicador actualizado con éxito",
        affectedRows: result.affectedRows,
      });
  });
};

const UpdateFrequencyIndicator = (req, res) => {
  const {frecuencia, id_indicador } = req.body;

  if (!frecuencia || !id_indicador  ) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const updateFrequencyIndicatorData = {
    frecuencia,
    id_indicador
  };

  Indicator.UpdateFrequencyIndicator(updateFrequencyIndicatorData, (err, result) => {
    if (err) {
      console.error("Error al actualizar la frecuencia del indicador:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }

    res
      .status(200)
      .json({
        message: "Indicador actualizado con éxito",
        affectedRows: result.affectedRows,
      });
  });
};

const DeleteIndicator = (req, res) => {
    const { indicador_id, periodo_inicio } = req.body;

    if(!indicador_id || !periodo_inicio){
        res.status(401).json({ error: "Todos los campos son obligatorios" });
    }
    const DeleteIndicatorData = {
        indicador_id, 
        periodo_inicio
    }

    Indicator.DeleteIndicator(DeleteIndicatorData, (err, result) => {
        if(err){
            console.error("Error al eliminar el indicador:", err);
            return res.status(500).json({ error: "Error en el servidor" });
        }
      
          res
            .status(200)
            .json({
              message: "Indicador eliminado con éxito",
              affectedRows: result.affectedRows,
            });

    });
}

module.exports = {
  getIndicators,
  getAllIndicators,
  registerIndicator,
  VerifyIndicator,
  UpdateIndicator,
  UpdateFrequencyIndicator,
  DeleteIndicator
};
