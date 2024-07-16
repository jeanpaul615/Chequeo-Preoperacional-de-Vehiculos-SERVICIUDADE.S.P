import React from "react";

const InspectionDriver = ({ formData, handleChange }) => {
  return (
    <fieldset className="mb-6 p-4 border rounded-lg shadow-md">
      <legend className="text-xl font-bold text-indigo-600 mb-4">Datos del Conductor</legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="mb-6">
          <label htmlFor="fecha" className="block text-gray-700 font-semibold mb-2">Fecha:</label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="nombreConductor" className="block text-gray-700 font-semibold mb-2">Nombre del Conductor:</label>
          <input
            type="text"
            id="nombreConductor"
            name="nombreConductor"
            value={formData.nombreConductor}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="licencia" className="block text-gray-700 font-semibold mb-2">Licencia de Conducción:</label>
          <input
            type="text"
            id="licencia"
            name="licencia"
            value={formData.licencia}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="seguridadSocial" className="block text-gray-700 font-semibold mb-2">Seguridad Social:</label>
          <input
            type="text"
            id="seguridadSocial"
            name="seguridadSocial"
            value={formData.seguridadSocial}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
      </div>
    </fieldset>
  );
};

export default InspectionDriver;
