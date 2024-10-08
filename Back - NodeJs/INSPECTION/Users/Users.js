const db = require("../../config/db/connectioninspeccion");

const Users = {
  //Modelo que obtiene todos los usuarios
  getAllUsers: (callback) => {
    const query = "SELECT * FROM user";

    db.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }

      callback(null, results);
    });
  },

//Modelo que obtiene el usuario por el id
  getUserById: (data, callback) => {
    const query = `SELECT   
    driver.driver_id AS driver_id,
    driver.name AS driver_name, 
    driver.license_until AS driver_license_until
    FROM driver WHERE user_id = ?`;

    const { user_id } = data;
    db.query(query, [user_id], (err, results) => {
      if (err) {
        return callback(err, null);
      }

      callback(null, results);
    });
  },
//consulta inner join para traer datos de dos tablas enlazadaas
  getUsers: (data, callback) => {
    const query = `
           SELECT 
    user.cedula AS user_cedula, 
    user.email AS user_email, 
    user.role AS user_role, 
    user.status AS user_status, 
    driver.driver_id As driver_id,
    driver.name AS driver_name, 
    driver.license_until AS driver_license_until, 
    user.user_id AS user_id
FROM 
    user
INNER JOIN 
    driver 
ON 
    user.user_id = driver.user_id;`;

    const { user_id } = data;

    db.query(query, [user_id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  UpdateUser: (data, callback) => {
    const query = `
      UPDATE user
      SET 
        cedula = ?,
        email = ?, 
        role = ?, 
        status = ?
      WHERE
        user_id = ?`;

    const { cedula, email, role, status, user_id } = data;

    db.query(query, [cedula, email, role, status, user_id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  DeleteUser: (data, callback) => {
  // Define las consultas para eliminar registros de ambas tablas
  const query1 = `DELETE FROM driver WHERE user_id = ?`;
  const query2 = `DELETE FROM user WHERE user_id = ?`;

  const { user_id } = data;

  // Primero elimina de la tabla 'driver'
  db.query(query1, [user_id], (err, results) => {
    if (err) {
      return callback(err, null);
    }

    // Luego elimina de la tabla 'user'
    db.query(query2, [user_id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  });
  },

  getDriverById: (data, callback) => {
    const query = `
           SELECT 
    user.cedula AS user_cedula, 
    user.email AS user_email, 
    user.role AS user_role, 
    user.status AS user_status, 
    driver.driver_id As driver_id,
    driver.name AS driver_name, 
    driver.license_until AS driver_license_until, 
    user.user_id AS user_id
FROM 
    user
INNER JOIN 
    driver 
ON 
    user.user_id = driver.user_id
WHERE user.user_id = ?`;

    const { user_id } = data;

    db.query(query, [user_id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },

};

module.exports = Users;
