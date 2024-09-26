import React, { useState, useEffect } from "react"; 
import Swal from "sweetalert2";
import { GetVehicleConditionById } from "../../../controllers/Inspection/InspectionControllers/GetVehicleConditionById";

// Componente principal de chequeo de condiciones
const ModalChequeo = ({ isOpen, onRequestClose, row }) => {
  const [conditions, setConditions] = useState([]);

  // Función para obtener las condiciones desde la API
  useEffect(() => {
    const fetchConditions = async () => {
      try {
        const response = await GetVehicleConditionById(row.inspection_id);
        setConditions(response);
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
    newConditions[index] = {
      ...newConditions[index],
      name_condition: value,
    };
    setConditions(newConditions);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 relative max-w-2xl w-full">
        <button
          type="button"
          onClick={onRequestClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition duration-200"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <h2 className="text-xl font-semibold mb-2">Revisión de Condiciones</h2>
        <h3 className="text-md text-gray-600 mb-4">
          ID de Inspección: <span className="font-bold">{row.inspection_id}</span>
        </h3>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto max-h-60">
            {conditions.map((condition, index) => (
              <div key={index} className="flex flex-col">
                <label className="block font-medium mb-1 text-gray-800">{condition.name_condition}</label>
                <input
                  type="text"
                  value={condition.conditions}
                  onChange={(e) => handleConditionChange(index, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-gray-800 transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Ingrese ${condition.name_condition}`}
                />
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 mt-4 w-full"
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalChequeo;
