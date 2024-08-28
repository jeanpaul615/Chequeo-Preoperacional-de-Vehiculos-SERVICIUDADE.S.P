import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { UpdateDriver } from "../../../controllers/Inspection/DriversControllers/UpdateDriver";

const ModalUpdate = ({ isOpen, onRequestClose, driver }) => {
  const [formData, setFormData] = useState({});

  const labelMap = {
    user_cedula: "Cédula",
    user_email: "Email",
    user_role: "Rol",
    user_status: "Estado",
    driver_name: "Nombre",
    driver_license_until: "Licencia válida hasta",
  };

  useEffect(() => {
    if (driver) {
      const formattedData = {
        ...driver,
        driver_license_until: driver.driver_license_until
          ? driver.driver_license_until.split("T")[0]  // Formatear fecha
          : "",
      };
      setFormData(formattedData);
    }
  }, [driver]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const success = await UpdateDriver(formData);
      if (success) {
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Los datos se han guardado correctamente.",
        });
        onRequestClose();
      } else {
        throw new Error("Error al actualizar el indicador");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire("Error", "Error al actualizar el usuario", "error");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onRequestClose}
          className="absolute md:top-4 md:right-4 top-1 right-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
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
          <span className="sm:text-base text-xs font-semibold pr-5">
            Actualizar Conductor:
          </span>
          <span className="sm:text-base text-xs font-medium">{formData.driver_name}</span>
        </div>
        <hr className="border-gray-400 opacity-50 pt-2 mb-6" />

        <form
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
          {Object.keys(labelMap).map((key) => (
            <div key={key} className="md:mb-4 -mb-1">
              <label className="block md:mb-2 md:text-sm text-xs font-medium text-gray-700">
                {labelMap[key]}
              </label>
              {key === "user_status" ? (
                <select
                  name={key}
                  value={formData[key] || ""}
                  onChange={handleChange}
                  className="md:text-base text-xs w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 text-gray-700"
                >
                  <option value="1">Activo</option>
                  <option value="0">Inactivo</option>
                </select>
              ) : key === "user_role" ? (
                <select
                  name={key}
                  value={formData[key] || ""}
                  onChange={handleChange}
                  className="md:text-base text-xs w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 text-gray-700"
                >
                  <option value="ADMIN">Administrador</option>
                  <option value="AUDITOR">Auditor</option>
                  <option value="CONDUCTOR">Conductor</option>
                </select>
              ) : key === "driver_license_until" ? (
                <input
                  type="date"
                  name={key}
                  value={formData[key] || ""}
                  onChange={handleChange}
                  className="md:text-base text-xs w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 text-gray-700"
                />
              ) : (
                <input
                  type="text"
                  name={key}
                  value={formData[key] || ""}
                  onChange={handleChange}
                  className="md:text-base text-xs w-full md:px-3 md:py-2 px-2 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 text-gray-700"
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center transition ease-in-out duration-150"
          >
            Actualizar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalUpdate;
