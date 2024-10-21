import React, { useState } from 'react';

export default function MaintenanceActionModal({ maintenance, onClose }) {
  const [selectedAction, setSelectedAction] = useState(null);

  // Función para manejar la selección de una opción
  const handleActionChange = (e) => {
    setSelectedAction(e.target.value);
  };

  // Función para continuar con la opción seleccionada
  const handleNextStep = () => {
    if (selectedAction) {
      alert(`Opción seleccionada: ${selectedAction}`);
      // Aquí puedes agregar la lógica para proceder con la opción seleccionada.
    } else {
      alert('Por favor, selecciona una opción antes de continuar.');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-white">
              Opciones de Mantenimiento <a className="text-xl font-semibold text-white hover:text-blue-400" href="/vehicle">{maintenance.license_plate}</a>
            </h3>
            
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span className="sr-only">Cerrar modal</span>
            </button>
          </div>

          {/* Modal body */}
          <div className="p-4 md:p-5">
            <p className="text-gray-400 mb-4 font-medium">Selecciona la acción a realizar:</p>
            <ul className="space-y-4 mb-4">
              <li>
                <input
                  type="radio"
                  id="option-1"
                  name="download"
                  value="Download"
                  className="hidden peer"
                  onChange={handleActionChange}
                />
                <label
                  htmlFor="option-1"
                  className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500"
                >
                  <div className="block">
                    <div className="w-full text-lg font-semibold">Descargar Hoja de Mantenimiento</div>
                    <div className="w-full text-gray-400 font-medium">Descargar Formato Excel</div>
                  </div>
                  <svg className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                  </svg>
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="option-2"
                  name="maintenance-action"
                  value="cargar"
                  className="hidden peer"
                  onChange={handleActionChange}
                />
                <label
                  htmlFor="option-2"
                  className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500"
                >
                  <div className="block">
                    <div className="w-full text-lg font-semibold">Subir por Primera Vez Hoja de Mantenimiento</div>
                    <div className="w-full text-gray-400 font-medium">Cargar primera vez en formato Excel</div>
                  </div>
                  <svg className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                  </svg>
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="option-3"
                  name="maintenance-action"
                  value="update"
                  className="hidden peer"
                  onChange={handleActionChange}
                />
                <label
                  htmlFor="option-3"
                  className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500"
                >
                  <div className="block">
                    <div className="w-full text-lg font-semibold">Actualizar Hoja de Mantenimiento</div>
                    <div className="w-full text-gray-400 font-medium">Si ya posee una Hoja de Mantenimiento, acá podrá actualizarla</div>
                  </div>
                  <svg className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                  </svg>
                </label>
              </li>
            </ul>
            <button
              className="text-white inline-flex w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleNextStep}
            >
              Siguiente paso
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
