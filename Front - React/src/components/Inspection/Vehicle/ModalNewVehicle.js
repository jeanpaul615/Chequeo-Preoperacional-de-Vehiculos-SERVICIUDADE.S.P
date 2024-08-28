import React, { useState } from "react";
import Swal from "sweetalert2";
import { NewVehicle } from "../../../controllers/Inspection/VehicleControllers/NewVehicle";

const ModalNewVehicle = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    type: "",
    license_plate: "",
    brand: "",
    area: "",
    soat_until: "",
    rtm_until: "",
    seguro_contractual_until: "",
    seguro_extracontractual_until: ""
  });

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
      const newVehicleData = await NewVehicle(formData);
      if (newVehicleData) {
        Swal.fire({
          title: 'Éxito',
          text: 'Vehículo agregado exitosamente.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        onClose(); // Cierra el modal si la operación fue exitosa
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: `No se pudo agregar el vehículo.`,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
      onClick={onClose} // Click outside should close the modal
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 relative"
        onClick={(e) => e.stopPropagation()} // Prevent event from bubbling up
      >
        <button
          type="button"
          onClick={onClose}
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
          <span className="text-lg font-semibold">Nuevo Vehículo:</span>
        </div>
        <hr className="border-gray-400 opacity-50 pt-2 mb-6" />
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex-1">
                <label className="block text-medium font-medium text-gray-700 mb-2">
                  Tipo (*):
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="mb-4 px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 font-medium w-full"
                >
                  <option value="">Seleccione un tipo</option>
                  <option value="RECOLECTOR">RECOLECTOR</option>
                  <option value="VOLQUETA">VOLQUETA</option>
                  <option value="LIVIANO">LIVIANO</option>
                  <option value="OTRO">OTRO</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-medium font-medium text-gray-700 mb-2">
                  Placa (*):
                </label>
                <input
                  type="text"
                  name="license_plate"
                  value={formData.license_plate}
                  onChange={handleChange}
                  required
                  maxLength="6"
                  className="mb-4 px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 font-medium w-full"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex-1">
                <label className="block text-medium font-medium text-gray-700 mb-2">
                  Marca (*):
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                  className="mb-4 px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 font-medium w-full"
                />
              </div>
              <div className="flex-1">
                <label className="block text-medium font-medium text-gray-700 mb-2">
                  Área:
                </label>
                <select
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  className="mb-4 px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 font-medium w-full"
                >
                  <option value="">Seleccione un área</option>
                  <option value="ASEO">ASEO</option>
                  <option value="ACUEDUCTO">ACUEDUCTO</option>
                  <option value="ALCANTARILLADO">ALCANTARILLADO</option>
                  <option value="OTRO">OTRO</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex-1">
                <label className="block text-medium font-medium text-gray-700 mb-2">
                  SOAT hasta (*):
                </label>
                <input
                  type="date"
                  name="soat_until"
                  value={formData.soat_until}
                  onChange={handleChange}
                  required
                  className="mb-4 px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 font-medium w-full"
                />
              </div>
              <div className="flex-1">
                <label className="block text-medium font-medium text-gray-700 mb-2">
                  RTM hasta (*):
                </label>
                <input
                  type="date"
                  name="rtm_until"
                  value={formData.rtm_until}
                  onChange={handleChange}
                  required
                  className="mb-4 px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 font-medium w-full"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex-1">
                <label className="block text-medium font-medium text-gray-700 mb-2">
                  Seguro Contractual hasta (*):
                </label>
                <input
                  type="date"
                  name="seguro_contractual_until"
                  value={formData.seguro_contractual_until}
                  onChange={handleChange}
                  required
                  className="mb-4 px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 font-medium w-full"
                />
              </div>
              <div className="flex-1">
                <label className="block text-medium font-medium text-gray-700 mb-2">
                  Seguro Extracontractual hasta (*):
                </label>
                <input
                  type="date"
                  name="seguro_extracontractual_until"
                  value={formData.seguro_extracontractual_until}
                  onChange={handleChange}
                  required
                  className="mb-4 px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 font-medium w-full"
                />
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

export default ModalNewVehicle;
