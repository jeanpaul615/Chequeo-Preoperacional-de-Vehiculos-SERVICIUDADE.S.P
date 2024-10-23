import { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { createMaintenance } from "../../../../controllers/Inspection/SheetMaintenanceControllers/createMaintenance";
const UploadDocumentModal = ({ isOpen, onClose }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [vehiclePlate, setVehiclePlate] = useState('');
  
    const handleFileChange = (e) => {
      setSelectedFile(e.target.files[0]);
    };
  
    const handlePlateChange = (e) => {
      setVehiclePlate(e.target.value);
    };
  
    const handleSubmit = async () => {
        if (selectedFile && vehiclePlate) {
          try {
            const response = await createMaintenance(vehiclePlate, selectedFile); // Esperar la respuesta
            if (response) {
              Swal.fire({
                icon: "success",
                title: "Éxito",
                text: "Archivo Cargado.",
              });
              onClose();
              window.location.reload();
            }
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: error.message || "Ya se creo una hoja de mantenimiento para este vehículo",
            });
          }
        } else {
          alert(
            "Por favor, selecciona un archivo y proporciona la placa del vehículo."
          );
        }
      };
      

  // Manejar el evento de arrastre sobre el área de carga
  const handleDragOver = (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado
    e.stopPropagation(); // Detener la propagación
  };

  // Manejar el evento de soltado
  const handleDrop = (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado
    e.stopPropagation(); // Detener la propagación

    const file = e.dataTransfer.files[0]; // Obtener el archivo soltado
    if (file) {
      setSelectedFile(file); // Establecer el archivo seleccionado
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
        className="bg-white rounded-xl shadow-xl w-11/12 md:w-1/3 p-8"
        initial={{ y: "-100vh" }}
        animate={{ y: "0" }}
        exit={{ y: "100vh" }}
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Subir Documento
        </h2>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Placa del vehículo:
          </label>
          <input
            type="text"
            value={vehiclePlate}
            onChange={handlePlateChange}
            className="block w-full text-sm text-gray-800 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            placeholder="Ej: ABC123"
          />
        </div>

        {/* Input file personalizado */}
        <div
          className="flex items-center justify-center w-full mb-6"
          onDragOver={handleDragOver} // Agrega el manejador de dragover
          onDrop={handleDrop} // Agrega el manejador de drop
        >
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click para cargar</span> o copie
                y pegue
              </p>
              <p className="text-xs text-gray-500">Solo Excel (XLSX)</p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {selectedFile && (
          <div className="flex items-center mt-2 text-sm text-green-600 pb-5">
            <svg
              className="w-5 h-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-3-3v6m9 2.5V6.5A2.5 2.5 0 0018.5 4H5.5A2.5 2.5 0 003 6.5v9A2.5 2.5 0 005.5 18h13a2.5 2.5 0 002.5-2.5z"
              />
            </svg>
            <span className="font-bold">Archivo seleccionado: </span>{"    "}
            {selectedFile.name}
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="text-white inline-flex w-full justify-center focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-red-600 hover:bg-red-700 focus:ring-red-800"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="text-white inline-flex w-full justify-center focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-green-600 hover:bg-green-700 focus:ring-green-800"
          >
            Subir
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UploadDocumentModal;
