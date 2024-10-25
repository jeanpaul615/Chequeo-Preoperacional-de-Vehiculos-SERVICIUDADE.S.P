import React, { useState } from 'react';
import { downloadMaintenance } from '../../../../controllers/Inspection/SheetMaintenanceControllers/downloadMaintenance';
import ModalDocumentUpdate from './ModalDocumentUpdate'; // Asegúrate de que esta ruta sea correcta
import { motion } from 'framer-motion';

export default function MaintenanceActionModal({ maintenance, onClose }) {
  const [selectedAction, setSelectedAction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleActionChange = (e) => {
    setSelectedAction(e.target.value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNextStep = () => {
    if (selectedAction === "Download") {
      handleDownload();
    } else if (selectedAction === "update") {
      openModal(maintenance);
    } else {
      alert('Por favor, selecciona una opción antes de continuar.');
    }
  };

  const handleDownload = async () => {
    try {
      const response = await downloadMaintenance(maintenance.id_maintenance);
      const url = window.URL.createObjectURL(new Blob([response.data])); // response.data contiene el blob
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'hoja_mantenimiento.xlsx'); // Nombre del archivo
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

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
        <div className="flex justify-center items-center">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative rounded-lg shadow bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
                <h3 className="text-lg font-semibold text-white">
                  OPCIONES DE HOJA MANTENIMIENTO
                  <a className="text-xl font-semibold text-white hover:text-blue-400" href="/vehicles">{maintenance.license_plate}</a>
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={onClose}
                >
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Cerrar modal</span>
                </button>
              </div>

              <div className="p-4 md:p-5">
                <p className="text-gray-400 mb-4 font-medium">Selecciona la acción a realizar:</p>
                <ul className="space-y-4 mb-4">
                  <li>
                    <input
                      type="radio"
                      id="option-1"
                      name="maintenance-action"
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
                    </label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      id="option-2"
                      name="maintenance-action"
                      value="update"
                      className="hidden peer"
                      onChange={handleActionChange}
                    />
                    <label
                      htmlFor="option-2"
                      className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500"
                    >
                      <div className="block">
                        <div className="w-full text-lg font-semibold">Actualizar Hoja de Mantenimiento</div>
                        <div className="w-full text-gray-400 font-medium">Si ya posee una Hoja de Mantenimiento, acá podrá actualizarla</div>
                      </div>
                    </label>
                  </li>
                </ul>
                <button
                  className="text-white inline-flex w-full justify-center focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                  onClick={handleNextStep}
                >
                  Siguiente paso
                </button>
              </div>
            </div>
          </div>

          <ModalDocumentUpdate
            maintenance={maintenance} // Pasar los datos de mantenimiento actuales
            isOpen={isModalOpen} // Controlar si el modal está abierto
            onClose={closeModal} // Cerrar el modal
          />
        </div>

      </motion.div>
    </motion.div>
  );
}
