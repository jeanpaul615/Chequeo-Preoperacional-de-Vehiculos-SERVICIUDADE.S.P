const db = require("../../config/db/connectionindicators");

const Indicator = {
  getIndicators: (callback) => {
    const query = `
            SELECT * FROM indicadores
        `;

    db.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },
  getAllIndicators: (callback) => {
    const query = `
            SELECT 
                id_indicador, nombre_indicador, frecuencia, valor, periodo_inicio 
            FROM 
                indicadores 
            INNER JOIN 
                registro_indicadores 
            ON 
                indicadores.id_indicador = registro_indicadores.indicador_id
        `;

    db.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  NewIndicatorRegister: (data, callback) => {
    const query = `
            INSERT INTO 
                registro_indicadores (indicador_id, valor, periodo_inicio) 
            VALUES 
                (?, ?, ?)
        `;

    const { indicador_id, valor, periodo_inicio } = data;
    db.query(query, [indicador_id, valor, periodo_inicio], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  VerifyIndicator: (data, callback) => {
    const query = `
      SELECT 
        * 
      FROM 
        registro_indicadores 
      WHERE 
        indicador_id = ? AND DATE_FORMAT(periodo_inicio, '%Y-%m') = DATE_FORMAT(?, '%Y-%m')
    `;

    const { indicador_id, periodo_inicio } = data;
    db.query(query, [indicador_id, periodo_inicio], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      // Si hay resultados, significa que el indicador ya existe en ese mes
      const exists = results.length > 0;
      callback(null, exists);
    });
  },
};


module.exports = Indicator;
