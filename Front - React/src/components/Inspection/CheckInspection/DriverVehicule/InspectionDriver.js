import React from "react";
import Sidebar from "../../../../containers/Sidebar";

const today = new Date().toISOString().split('T')[0];

const InspectionDriver = ({ formData, handleChange }) => {
  return (
    <div className="text-flex flex-col md:flex-row md:justify-center p-4">
      <Sidebar className="md:w-1/4" />
      <fieldset className="flex-1 max-w-4xl mb-6 p-8 bg-white border border-gray-300 rounded-lg shadow-md">
        <h1 className="text-xlxl font-bold text-gray-800">Datos del Conductor</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-6">
            <label htmlFor="fecha" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Fecha:</label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              value={formData.fecha || today}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:font-semibold dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="nombre_conductor" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Nombre del Conductor:</label>
            <input
              type="text"
              id="nombre_conductor"
              name="nombre_conductor"
              value={formData.nombre_conductor}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:font-semibold dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="licencia" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Licencia de Conducción:</label>
            <input
              type="text"
              id="licencia"
              name="licencia"
              value={formData.licencia}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:font-semibold dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="seguridad_social" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Seguridad Social:</label>
            <input
              type="text"
              id="seguridad_social"
              name="seguridad_social"
              value={formData.seguridad_social}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:font-semibold dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default InspectionDriver;
