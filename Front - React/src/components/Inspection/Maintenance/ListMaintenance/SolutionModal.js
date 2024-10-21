import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { UpdateMaintenance } from '../../../../controllers/Inspection/MaintenanceControllers/UpdateMaintenance';

export default function SolutionModal({ maintenance, onClose }) {
  const [solution, setSolution] = useState('');

  const handleSolutionChange = (e) => {
    setSolution(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(maintenance.id_maintenance, solution);

      // Aquí pasamos los parámetros correctamente
      const success = await UpdateMaintenance(maintenance.id_maintenance, solution);

      if (success) {
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Solución enviada con éxito.",
        });
        onClose();
        window.location.reload();
      } else {
        throw new Error("Error al enviar la solución");
      }
    } catch (error) {
      console.error("Error actualizando la solución:", error);
      Swal.fire("Error", "Hubo un problema al enviar la solución.", "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative p-6 w-full max-w-lg max-h-full bg-white rounded-xl shadow-2xl transform transition-all duration-300 ease-out">
        {/* Modal header */}
        <div className="flex items-center justify-between border-b pb-4 mb-4">
          <h3 className="text-xl font-semibold text-gray-900">
            Solución de Mantenimiento <span className="font-bold text-blue-600">{maintenance.vehicle_id}</span>
          </h3>
          <button
            type="button"
            className="text-gray-400 hover:text-red-600 transition-colors duration-200 rounded-lg text-lg h-8 w-8 flex justify-center items-center"
            onClick={onClose}
          >
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
            <span className="sr-only">Cerrar modal</span>
          </button>
        </div>

        {/* Input para la solución */}
        <div className="mb-6">
          <label htmlFor="solution" className="block text-gray-700 font-medium mb-2">Ingrese la solución:</label>
          <textarea
            id="solution"
            value={solution}
            onChange={handleSolutionChange}
            className="block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none h-28 text-gray-700 placeholder-gray-400"
            placeholder="Describa la solución de mantenimiento aquí"
          />
        </div>

        {/* Modal footer */}
        <div className="flex items-center justify-end space-x-4 border-t pt-4">
          <button
            type="button"
            className="bg-gray-300 text-gray-700 hover:bg-gray-400 focus:ring-2 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2.5 transition-colors duration-200"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 font-medium rounded-lg text-sm px-5 py-2.5 transition-colors duration-200"
            onClick={handleSubmit}
          >
            Enviar Solución
          </button>
        </div>
      </div>
    </div>
  );
}
