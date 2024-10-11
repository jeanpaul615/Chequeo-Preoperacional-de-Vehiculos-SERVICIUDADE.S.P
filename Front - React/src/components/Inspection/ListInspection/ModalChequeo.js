import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { GetVehicleConditionById } from "../../../controllers/Inspection/InspectionControllers/GetVehicleConditionById";
import { CheckedBy } from "../../../controllers/Inspection/InspectionControllers/CheckedBy";

const ModalChequeo = ({ isOpen, onRequestClose, row, isViewOnly }) => {
  const [conditions, setConditions] = useState([]);
  const [auditor, setAuditor] = useState("");

  useEffect(() => {
    const fetchConditions = async () => {
      try {
        const response = await GetVehicleConditionById(row.inspection_id);
        setConditions(response);
      } catch (error) {
        Swal.fire("Error al obtener las condiciones:", error.message);
      }
    };

    if (row.inspection_id) {
      fetchConditions();
    }
  }, [row.inspection_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await CheckedBy({
        auditor: auditor,
        row: row,
      });
      window.location.reload(response);
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

  const handleConditionChange = (index, value) => {
    const newConditions = [...conditions];
    newConditions[index] = {
      ...newConditions[index],
      conditions: value,
    };
    setConditions(newConditions);
  };

  const handleConditionClick = (condition) => {
    if (condition.conditions === "Mal" || condition.conditions === "Regular") {
      Swal.fire({
        title: "Observación",
        text: condition.comment || "No hay comentario disponible",
        icon: "info",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? "is-active" : ""} fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50`}>
      <div className="bg-white rounded-lg shadow-lg p-6 relative max-w-3xl w-full">
        <button
          type="button"
          onClick={onRequestClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition duration-200"
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

        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
          Revisión de Chequeo Preoperacional
        </h2>
        <h3 className="text-md text-gray-600 mb-6 text-center">
          ID de Inspección:{" "}
          <span className="font-bold">{row.inspection_id}</span>
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-y-auto max-h-60 px-4">
            {conditions.map((condition, index) => (
              <div key={index} className="flex flex-col mb-4">
                <label className="block font-medium mb-1 text-gray-700">
                  {condition.name_condition}
                </label>
                <input
                  type="text"
                  value={condition.conditions}
                  onClick={() => handleConditionClick(condition)}
                  onChange={(e) => handleConditionChange(index, e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg shadow-sm text-black transition duration-150 focus:outline-none focus:ring-2 ${
                    condition.conditions === "Mal"
                      ? "bg-red-300 border-red-500 focus:ring-red-400"
                      : condition.conditions === "Regular"
                      ? "bg-orange-300 border-orange-500 focus:ring-orange-400"  // Clase para 'Regular'
                      : "bg-green-100 border-green-200 focus:ring-green-400"  // Clase por defecto
                  }`}
                  
                  placeholder={`Estado de ${condition.name_condition}`}
                  readOnly={isViewOnly} // Disable editing if in view-only mode
                />
              </div>
            ))}
          </div>

          {/* Input para que el auditor ingrese su nombre */}
          <div className="mt-4">
            <label className="block font-medium mb-1 text-gray-700">
              Nombre del Auditor:
            </label>
            <input
              type="text"
              value={auditor}
              onChange={(e) => setAuditor(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm text-black transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingrese su nombre"
              required
              disabled={isViewOnly} // Disable auditor input if in view-only mode
            />
          </div>

          {!isViewOnly && (
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                Enviar Revisión
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ModalChequeo;
