const db = require("../../config/db/connectionindicators"); // Importa la conexión a la base de datos

const Indicator = {
  /**
   * Obtiene todos los indicadores para mostrarlos en una lista desplegable (incluye nombre y periodicidad).
   * @param {function} callback - Función callback para manejar el resultado de la consulta.
   */
  getIndicators: (callback) => {
    const query = `
      SELECT * FROM indicadores
    `; // Consulta SQL para obtener todos los indicadores

    db.query(query, (err, results) => {
      if (err) {
        return callback(err, null); // Maneja el error si la consulta falla
      }
      callback(null, results); // Devuelve los resultados si la consulta tiene éxito
    });
  },

  /**
   * Obtiene los indicadores paginados mediante un join para mostrar datos específicos de múltiples tablas.
   * @param {number} offset - Desplazamiento para la paginación.
   * @param {number} limit - Límite de registros por página.
   * @param {function} callback - Función callback para manejar el resultado de la consulta.
   */
  getAllIndicatorsPaginated: (offset, limit, callback) => {
    const query = `
      SELECT 
        id_registro, id_indicador, nombre_indicador, frecuencia, valor, periodo_inicio 
      FROM 
        indicadores 
      INNER JOIN 
        registro_indicadores 
      ON 
        indicadores.id_indicador = registro_indicadores.indicador_id
      LIMIT ? OFFSET ?
    `; // Consulta SQL para realizar el join y la paginación

    db.query(query, [limit, offset], (err, results) => {
      if (err) {
        return callback(err, null); // Maneja el error si la consulta falla
      }
      callback(null, results); // Devuelve los resultados si la consulta tiene éxito
    });
  },

  /**
   * Registra un nuevo indicador en la base de datos.
   * @param {Object} data - Contiene los datos del indicador a registrar (indicador_id, valor, periodo_inicio).
   * @param {function} callback - Función callback para manejar el resultado de la consulta.
   */
  NewIndicatorRegister: (data, callback) => {
    const query = `
      INSERT INTO 
        registro_indicadores (indicador_id, valor, periodo_inicio) 
      VALUES 
        (?, ?, ?)
    `; // Consulta SQL para insertar un nuevo indicador

    const { indicador_id, valor, periodo_inicio } = data;
    db.query(query, [indicador_id, valor, periodo_inicio], (err, results) => {
      if (err) {
        return callback(err, null); // Maneja el error si la consulta falla
      }
      callback(null, results); // Devuelve los resultados si la inserción tiene éxito
    });
  },

  /**
   * Verifica si un indicador ya existe para evitar registros duplicados.
   * @param {Object} data - Contiene el ID del indicador y la fecha de inicio del periodo (indicador_id, periodo_inicio).
   * @param {function} callback - Función callback para manejar el resultado de la consulta.
   */
  VerifyIndicator: (data, callback) => {
    const query = `
      SELECT 
        * 
      FROM 
        registro_indicadores 
      WHERE 
        indicador_id = ? AND DATE_FORMAT(periodo_inicio, '%Y-%m') = DATE_FORMAT(?, '%Y-%m')
    `; // Consulta SQL para verificar si ya existe un indicador en un mes específico

    const { indicador_id, periodo_inicio } = data;
    db.query(query, [indicador_id, periodo_inicio], (err, results) => {
      if (err) {
        return callback(err, null); // Maneja el error si la consulta falla
      }
      const exists = results.length > 0; // Verifica si el indicador ya existe
      callback(null, exists); // Devuelve el resultado de la verificación
    });
  },

  /**
   * Actualiza el valor de un indicador basado en su ID y el periodo de inicio.
   * @param {Object} data - Contiene los datos del indicador a actualizar (indicador_id, valor, periodo_inicio).
   * @param {function} callback - Función callback para manejar el resultado de la consulta.
   */
  UpdateIndicator: (data, callback) => {
    const query = `
      UPDATE 
        registro_indicadores 
      SET 
        valor = ? 
      WHERE 
        indicador_id = ? AND periodo_inicio = ?
    `; // Consulta SQL para actualizar el valor de un indicador

    const { valor, indicador_id, periodo_inicio } = data;
    db.query(query, [valor, indicador_id, periodo_inicio], (err, results) => {
      if (err) {
        return callback(err, null); // Maneja el error si la consulta falla
      }
      callback(null, results); // Devuelve los resultados si la actualización tiene éxito
    });
  },

  /**
   * Actualiza la frecuencia de un indicador.
   * @param {Object} data - Contiene los datos de la frecuencia a actualizar (frecuencia, id_indicador).
   * @param {function} callback - Función callback para manejar el resultado de la consulta.
   */
  UpdateFrequencyIndicator: (data, callback) => {
    const query = `
      UPDATE 
        indicadores 
      SET 
        frecuencia = ? 
      WHERE 
        id_indicador = ?
    `; // Consulta SQL para actualizar la frecuencia de un indicador

    const { frecuencia, id_indicador } = data;
    db.query(query, [frecuencia, id_indicador], (err, results) => {
      if (err) {
        return callback(err, null); // Maneja el error si la consulta falla
      }
      callback(null, results); // Devuelve los resultados si la actualización tiene éxito
    });
  },

  /**
   * Elimina un indicador basado en su ID y el periodo de inicio.
   * @param {Object} data - Contiene los datos del indicador a eliminar (indicador_id, periodo_inicio).
   * @param {function} callback - Función callback para manejar el resultado de la consulta.
   */
  DeleteIndicator: (data, callback) => {
    const query = `
      DELETE FROM 
        registro_indicadores 
      WHERE 
        indicador_id = ? AND periodo_inicio = ?
    `; // Consulta SQL para eliminar un indicador

    const { indicador_id, periodo_inicio } = data;
    db.query(query, [indicador_id, periodo_inicio], (err, results) => {
      if (err) {
        return callback(err, null); // Maneja el error si la consulta falla
      }
      callback(null, results); // Devuelve los resultados si la eliminación tiene éxito
    });
  },
};

module.exports = Indicator; // Exporta el objeto Indicator
