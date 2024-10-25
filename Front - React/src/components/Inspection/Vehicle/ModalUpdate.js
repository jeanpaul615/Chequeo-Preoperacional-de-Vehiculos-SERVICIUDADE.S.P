import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { UpdateVehicle } from "../../../controllers/Inspection/VehicleControllers/UpdateVehicle";
import { motion } from "framer-motion";

const ModalUpdate = ({ isOpen, onClose, vehicle }) => {
  const [formData, setFormData] = useState({});

  const labelMap = {
    vehicle_id: "ID del Vehículo",
    type: "Tipo",
    license_plate: "Placa",
    brand: "Marca",
    area: "Área",
    soat_until: "SOAT Válido Hasta",
    rtm_until: "RTM Válido Hasta",
  };

  useEffect(() => {
    if (vehicle) {
      const formattedData = {
        ...vehicle,
        soat_until: vehicle.soat_until ? vehicle.soat_until.split("T")[0] : "",
        rtm_until: vehicle.rtm_until ? vehicle.rtm_until.split("T")[0] : "",
      };
      setFormData(formattedData);
    }
  }, [vehicle]);

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
      const success = await UpdateVehicle(formData);
      if (success) {
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Los datos del vehículo se han actualizado correctamente.",
        });
        onClose();
        window.location.reload();
      } else {
        throw new Error("Error al actualizar el vehículo");
      }
    } catch (error) {
      console.error("Error updating vehicle:", error);
      Swal.fire("Error", "Error al actualizar el vehículo", "error");
    }
  };

  if (!isOpen) return null;

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

        <div
          className=" flex items-center justify-center z-50"
          onClick={onClose} // Click outside should close the modal
        >
          <div
            className="bg-white rounded-lg shadow-lg p-4 relative"
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
              <span className="text-lg font-semibold">Actualizar Vehículo:</span>
            </div>
            <hr className="border-gray-400 opacity-50 pt-2 mb-4" />

            <form
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              onSubmit={handleSubmit}
            >
              {Object.keys(labelMap).map((key) => (
                <div key={key} className="">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {labelMap[key]}
                  </label>
                  {key === "vehicle_id" ? ( // Campo solo lectura para ID del vehículo
                    <input
                      type="text"
                      name={key}
                      value={formData[key] || ""}
                      readOnly
                      className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 font-medium w-full"
                    />
                  ) : key === "type" || key === "area" ? (
                    <select
                      name={key}
                      value={formData[key] || ""}
                      onChange={handleChange}
                      className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 font-medium w-full"
                    >
                      {key === "type" && (
                        <>
                          <option value="">Seleccione Tipo</option>
                          <option value="RECOLECTOR">RECOLECTOR</option>
                          <option value="VOLQUETA">VOLQUETA</option>
                          <option value="LIVIANO">LIVIANO</option>
                          <option value="CAMION">CAMIÓN</option>
                          <option value="CAMIONETA">CAMIONETA</option>
                          <option value="MOTO">MOTO</option>
                          <option value="OTRO">OTRO</option>
                        </>
                      )}
                      {key === "area" && (
                        <>
                          <option value="">Seleccione Área</option>
                          <option value="ASEO">Aseo</option>
                          <option value="ACUEDUCTO">Acueducto</option>
                          <option value="ALCANTARILLADO">Alcantarillado</option>
                          <option value="OTRO">Otro</option>
                        </>
                      )}
                    </select>
                  ) : key.includes("until") ? (
                    <input
                      type="date"
                      name={key}
                      value={formData[key] || ""}
                      onChange={handleChange}
                      className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 font-medium w-full"
                    />
                  ) : (
                    <input
                      type="text"
                      name={key}
                      value={formData[key] || ""}
                      onChange={handleChange}
                      className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 font-medium w-full"
                    />
                  )}
                </div>
              ))}
              <div className="col-span-2 flex justify-center mt-4">
                <button
                  type="submit"
                  className="py-3 px-4 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-full text-sm transition ease-in-out duration-150"
                >
                  Actualizar
                </button>
              </div>
            </form>
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
};

export default ModalUpdate;
