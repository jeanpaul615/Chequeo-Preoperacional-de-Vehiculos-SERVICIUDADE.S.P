const db = require('../../config/db/connectionindicators');

const Variables = {
  // Obtener todas las variables
  getAllVariables: (callback) => {
    const query = `
      SELECT 
        variables.id_variable, 
        variables.nombre, 
        valor_variables.indicador_id,  
        indicadores.nombre_indicador,
        valor_variables.periodo,
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
  /**
   * @function getAllVariables
   * @description Obtiene todas las variables junto con su información relacionada.
   * @param {Function} callback - Función de callback para manejar el resultado o error.
   * @returns {Array} results - Lista de variables con sus respectivos detalles.
   */

  getVariables: (callback) => {
    const query = `
      SELECT * FROM variables 
    `;

    db.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },
  /**
   * @function getVariables
   * @description Obtiene todas las variables.
   * @param {Function} callback - Función de callback para manejar el resultado o error.
   * @returns {Array} results - Lista de todas las variables.
   */

  // Obtener variables por ID
  getVariablesById: (id_indicador, callback) => {
    const query = 'SELECT * FROM variables WHERE id_indicador = ?'; // Asegúrate de que el nombre de la columna sea correcto
    db.query(query, [id_indicador], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },
  /**
   * @function getVariablesById
   * @description Obtiene variables basadas en el ID del indicador.
   * @param {number} id_indicador - ID del indicador para buscar variables.
   * @param {Function} callback - Función de callback para manejar el resultado o error.
   * @returns {Array} results - Lista de variables correspondientes al ID del indicador.
   */

  // Registrar una nueva variable
  NewVariableRegister: (data, callback) => {
    const query = `
      INSERT INTO 
        valor_variables (indicador_id, variable_id, valor, periodo) 
      VALUES 
        (?, ?, ?, ?)
    `;
    const { indicador_id, variable_id, valor, periodo } = data;
    db.query(query, [indicador_id, variable_id, valor, periodo], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }
  /**
   * @function NewVariableRegister
   * @description Registra una nueva variable en la base de datos.
   * @param {Object} data - Datos de la variable a registrar (indicador_id, variable_id, valor, periodo).
   * @param {Function} callback - Función de callback para manejar el resultado o error.
   * @returns {Object} results - Resultados de la operación de inserción.
   */
};

module.exports = Variables;
/**
 * @module Variables
 * @description Módulo que maneja la obtención y registro de variables en la base de datos.
 */
