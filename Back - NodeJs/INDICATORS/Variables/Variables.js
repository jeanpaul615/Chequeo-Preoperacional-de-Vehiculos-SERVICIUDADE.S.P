const db = require('../../config/db/connectionindicators');

const Variables = {
  getAllVariables: (callback) => {
    const query = `
      SELECT 
        variables.id_variable, 
        variables.nombre, 
        valor_variables.indicador_id,  
        indicadores.nombre_indicador,
        valor_variables.valor
      FROM variables 
      INNER JOIN valor_variables ON valor_variables.variable_id = variables.id_variable
      INNER JOIN indicadores ON valor_variables.indicador_id = indicadores.id_indicador
    `; 

    db.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }

      callback(null, results); 
    });
  },
};

module.exports = Variables;