const db = require("../../config/db/connectionindicators");

const Indicator = {
  //Trae los indicadores para verlos en una lista desplegable(nombre y periodicidad).
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
  /*Se obtiene los indicadores haciendo un inner join,
  para poder ver reflejado el nombre y datos especificos que estan separados en varias tablas.*/
  getAllIndicators: (callback) => {
    const query = `
            SELECT 
                id_registro, id_indicador, nombre_indicador, frecuencia, valor, periodo_inicio 
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
  //Se encarga en registrar un nuevo Indicador
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
  //Verifica si el indicador ya existe para que no haya duplicidad en los registros.
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

  UpdateIndicator: (data, callback) => {
    const query = `UPDATE registro_indicadores 
    SET valor = ? 
    WHERE indicador_id = ? AND periodo_inicio = ?`;
    //El orden de la query debe ser el mismo de la data, para que no hayan errores en la consulta
    const { valor, indicador_id, periodo_inicio } = data;
    db.query(query, [valor, indicador_id, periodo_inicio], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  UpdateFrequencyIndicator: (data, callback) => {
    const query = `UPDATE indicadores 
    SET frecuencia = ? 
    WHERE id_indicador = ?`;
    //El orden de la query debe ser el mismo de la data, para que no hayan errores en la consulta
    const { frecuencia, id_indicador } = data;
    db.query(query, [frecuencia, id_indicador], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  DeleteIndicator: (data, callback) => {
    const query = `DELETE FROM registro_indicadores 
    WHERE indicador_id = ? AND periodo_inicio = ?`;

    const { indicador_id, periodo_inicio } = data;
    db.query(query, [indicador_id, periodo_inicio], (err, results) => {
      if(err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },
};

module.exports = Indicator;
