import React, { useState, useEffect } from "react";
import { GetUsers } from "../../../controllers/Inspection/UsersControllers/User";
import { NewDriver } from "../../../controllers/Inspection/DriversControllers/NewDriver";
import Swal from "sweetalert2";

const ModalNewDriver = ({ onRequestClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    license_until: "",
    user_id: ""
  });
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.cedula.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      const newDriverData = await NewDriver( formData);
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
        text: `El conductor ya esta registrado:`,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="modal-content relative bg-white p-6 rounded-lg shadow-xl w-full max-w-lg md:max-w-2xl lg:max-w-4xl">
        <button
          type="button"
          onClick={onRequestClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          aria-label="Close modal"
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
          <span className="text-lg font-semibold">Nuevo Conductor:</span>
        </div>
        <hr className="border-gray-400 opacity-50 pt-2 mb-6" />
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex-1">
                <label className="block text-medium font-medium text-gray-700 mb-2">
                  Nombre (*):
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mb-4 px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 font-medium w-full"
                />
              </div>
              <div className="flex-1">
                <label className="block text-medium font-medium text-gray-700 mb-2">
                  Vencimiento de licencia (*):
                </label>
                <input
                  type="date"
                  name="license_until"
                  value={formData.license_until}
                  onChange={handleChange}
                  required
                  className="mb-4 px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 font-medium w-full"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex-1">
                <label className="block text-medium font-medium text-gray-700 mb-2">
                  Buscar por cédula:
                </label>
                <input
                  type="number"
                  className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 font-medium w-full"
                  placeholder="Buscar por cédula..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="flex-1">
                <label className="block text-medium font-medium text-gray-700 mb-2">
                  Seleccione cédula:
                </label>
                <select
                  className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 font-medium w-full"
                  name="user_id"
                  value={formData.user_id}
                  required
                  onChange={handleChange}
                >
                  <option value="">Seleccione la cédula (Verifique su correo)</option>
                  {filteredUsers.map((user) => (
                    <option key={user.user_id} value={user.user_id}>
                      {user.cedula} {"("}{user.email}{")"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-full text-sm px-6 py-3 text-center transition ease-in-out duration-150"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalNewDriver;
