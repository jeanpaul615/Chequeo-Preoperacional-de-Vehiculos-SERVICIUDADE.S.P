const Users = require("./Users"); // Importa el módulo correcto

// Controlador para obtener todos los usuarios
const getAllUsers = (req, res) => {
  Users.getAllUsers((err, users) => {
    if (err) {
      console.error("Error al obtener usuarios:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }
    res.json(users);
  });
};

const getUsers = (req, res) => {
  const { user_id } = req.body;

  const updateUserData = {
    user_id,
  };

  Users.getUsers(updateUserData, (err, user) => {
    if (err) {
      console.error("Error al obtener el usuario:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }
    if (user.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json(user);
  });
};

const getUserById = (req, res) => {
  const { user_id } = req.body;

  const updateUserData = {
    user_id,
  };

  Users.getUserById(updateUserData, (err, user) => {
    if (err) {
      console.error("Error al obtener el usuario:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }
    if (user.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json(user);
  });
};

const UpdateUser = (req, res) => {
  const { cedula, email, role, status, user_id } = req.body;

  if (!cedula || !email || !role || !status || !user_id) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const updateUserData = {
    cedula,
    email,
    role,
    status,
    user_id,
  };

  Users.UpdateUser(updateUserData, (err, result) => {
    if (err) {
      console.error("Error al actualizar el usuario:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }

    res.status(200).json({
      message: "Usuario actualizado con éxito",
      affectedRows: result.affectedRows,
    });
  });
};


const DeleteUser = (req, res) => {
  const { user_id } = req.body;

  if(!user_id){
      res.status(401).json({ error: "Todos los campos son obligatorios" });
  }
  const DeleteUserData = {
      user_id
  }

  Users.DeleteUser(DeleteUserData, (err, result) => {
      if(err){
          console.error("Error al eliminar el usuario:", err);
          return res.status(500).json({ error: "Error en el servidor" });
      }
    
        res
          .status(200)
          .json({
            message: "Usuario eliminado con éxito",
            affectedRows: result.affectedRows,
          });

  });
}
module.exports = {
  getAllUsers,
  getUsers,
  UpdateUser,
  DeleteUser,
  getUserById
};
