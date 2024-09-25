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

        // Parsear el JSON recibido y convertirlo a un formato adecuado
        const conditionsArray = Object.entries(response).map(([key, value]) => ({
          name: key,
          status: value,
        }));

        setConditions(conditionsArray); // Guardamos las condiciones
      } catch (error) {
        Swal.fire('Error al obtener las condiciones:', error.message);
      }
    };

    if (row.inspection_id) {
      fetchConditions();
    }
  }, [row.inspection_id]);

  // Función para manejar cambios en las condiciones
  const handleConditionChange = (index, value) => {
    setConditions(prevConditions => {
      const newConditions = [...prevConditions];
      newConditions[index].status = value; // Agregamos el estado seleccionado a cada condición
      return newConditions;
    });
  };

  // Función para manejar el submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Aquí puedes enviar las condiciones actualizadas al backend
      console.log("Condiciones actualizadas:", conditions);

      // Enviar condiciones al backend (puedes usar otra función o Axios directamente)
      // await sendUpdatedConditionsToBackend(conditions);

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 relative">
        <button
          type="button"
          onClick={onRequestClose}
          className="absolute md:top-4 md:right-4 top-1 right-1 text-gray-400 hover:text-gray-600"
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
        <h2 className="text-lg font-semibold mb-4">Revisión de Condiciones</h2>
        <form onSubmit={handleSubmit}>
          <div className="overflow-y-scroll h-64">
            {conditions.map((condition, index) => (
              <div key={index} className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  {condition.name}: {/* Mostramos el nombre de la condición */}
                </label>
                <select
                  value={condition.status || 'Bien'} // Manejamos el valor por defecto
                  onChange={(e) => handleConditionChange(index, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="Bien">Bien</option>
                  <option value="Mal">Mal</option>
                  <option value="No aplica">No aplica</option>
                </select>
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-lg mt-4"
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalChequeo;
