import React, { useState, useEffect } from "react"; 
import Swal from "sweetalert2";
import { GetVehicleConditionById } from "../../../controllers/Inspection/InspectionControllers/GetVehicleConditionById";

// Componente principal de chequeo de condiciones
const ModalChequeo = ({ isOpen, onRequestClose, row }) => {
  const [conditions, setConditions] = useState([]); // Cambiar a un array

  // Función para obtener las condiciones desde la API
  useEffect(() => {
    const fetchConditions = async () => {
      try {
        const response = await GetVehicleConditionById(row.inspection_id);
        console.log("Raw response:", response);
  
        // Asegúrate de que response[0].conditions sea una cadena JSON válida
        if (Array.isArray(response) && response.length > 0 && typeof response[0].conditions === 'string') {
          const conditionsString = response[0].conditions;
          try {
            const parsedConditions = JSON.parse(conditionsString);
            setConditions(parsedConditions);
            console.log("Condiciones parseadas:", parsedConditions);
          } catch (error) {
            console.error("Error al parsear JSON:", error);
            Swal.fire('Error', 'Error al parsear las condiciones JSON', 'error');
          }
        } else {
          throw new Error("Formato de respuesta inválido o condiciones no encontradas.");
        }
      } catch (error) {
        Swal.fire('Error al obtener las condiciones:', error.message);
      }
    };
  
    if (row.inspection_id) {
      fetchConditions();
    }
  }, [row.inspection_id]);

  // Función para manejar el submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Condiciones actualizadas:", conditions);
      // Aquí puedes enviar las condiciones actualizadas al backend

      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Los datos se han guardado correctamente.",
      });
      onRequestClose();
    } catch (error) {
      Swal.fire("Error", "Error al actualizar las condiciones", "error");
    }
  };

  // Función para actualizar una condición individual
  const handleConditionChange = (index, value) => {
    const newConditions = [...conditions];
    newConditions[index] = value; // Actualiza la condición específica
    setConditions(newConditions);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 relative max-w-md w-full">
        <button
          type="button"
          onClick={onRequestClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-lg font-semibold mb-4">Revisión de Condiciones</h2>
        <form onSubmit={handleSubmit}>
          <div className="overflow-y-scroll h-64">
            {/* Mostrar condiciones como inputs */}
            {conditions.map((condition, index) => (
              <div key={index} className="mb-2">
                <input
                  type="text"
                  value={condition}
                  onChange={(e) => handleConditionChange(index, e.target.value)}
                  className="border border-gray-300 rounded mx-1 w-full"
                />
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalChequeo;
