import React, { useState, useEffect } from "react";
import { GetUsers } from "../../../controllers/Inspection/UsersControllers/User";
import { Register } from "../../../controllers/Inspection/RegisterControllers/Register";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const ModalNewDriver = ({ onRequestClose }) => {
  const [formData, setFormData] = useState({
    cedula: "", // Added cedula to formData for correct binding
    name: "",
    license_until: "",
    user_id: "",
    role: "", // Added role to formData for correct binding
    email: "",
    password: ""
  });
  const [users, setUsers] = useState([]);
  const [isUserRegistered, setIsUserRegistered] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await GetUsers();
        setUsers(usersData);
      } catch (error) {
        console.error("Error al traer usuarios:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "user_id") {
      const selectedUser = users.find(user => user.user_id === value);
      setIsUserRegistered(!!selectedUser);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isUserRegistered) {
      Swal.fire({
        title: 'Error',
        text: `La cédula ya está registrada.`,
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    try {
      const newDriverData = await Register(formData);
      if (newDriverData) {
        Swal.fire({
          title: 'Éxito',
          text: 'Conductor agregado exitosamente.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        onRequestClose(); // Cierra el modal si la operación fue exitosa
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: `Error al agregar el conductor: ${error.message}`,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="rounded-xl w-11/12 md:w-1/3"
        initial={{ y: "-50vh" }}
        animate={{ y: "0" }}
        exit={{ y: "50vh" }}
      >
        <div className="flex items-center justify-center z-50">
          <div className="modal-content relative bg-white p-6 rounded-lg shadow-xl w-full max-w-lg md:max-w-2xl lg:max-w-4xl">
            <button
              type="button"
              onClick={onRequestClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              aria-label="Cerrar modal"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="flex justify-center items-center mb-4">
              <span className="text-lg font-semibold">Nuevo Conductor</span>
            </div>
            <hr className="border-gray-400 opacity-50 pt-2 mb-6" />
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Cédula (*):</label>
                <input
                  type="number"
                  name="cedula"
                  value={formData.cedula}
                  onChange={handleChange}
                  className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 font-medium w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre (*):</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 font-medium w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Rol (*):</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 font-medium w-full"
                >
                  <option value="">Seleccione un tipo</option>
                  <option value="ADMIN">ADMINISTRADOR</option>
                  <option value="CONDUCTOR">CONDUCTOR</option>
                  <option value="AUDITOR">AUDITOR</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Vigencia de la Licencia (*):</label>
                <input
                  type="date"
                  name="license_until"
                  value={formData.license_until}
                  onChange={handleChange}
                  className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 font-medium w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico (*):</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 font-medium w-full"
                  required
                />
              </div>
              <div className="mb-4 relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña (*):</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 font-medium w-full"
                  required
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <button
                  type="submit"
                  className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-full text-sm px-6 py-3 text-center transition ease-in-out duration-150 w-full"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ModalNewDriver;