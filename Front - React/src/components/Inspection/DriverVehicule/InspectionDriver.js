import React from "react";

const InspectionDriver = ({ formData, handleChange }) => {
  return (
    <fieldset className="mb-4">
      <legend className="text-lg font-semibold">Datos del Conductor</legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="mb-4">
          <label htmlFor="fecha" className="block text-gray-700 font-bold mb-2">Fecha:</label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="nombreConductor" className="block text-gray-700 font-bold mb-2">Nombre del Conductor:</label>
          <input
            type="text"
            id="nombreConductor"
            name="nombreConductor"
            value={formData.nombreConductor}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="licencia" className="block text-gray-700 font-bold mb-2">Licencia de Conducción:</label>
          <input
            type="text"
            id="licencia"
            name="licencia"
            value={formData.licencia}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="seguridadSocial" className="block text-gray-700 font-bold mb-2">Seguridad Social:</label>
          <input
            type="text"
            id="seguridadSocial"
            name="seguridadSocial"
            value={formData.seguridadSocial}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
      </div>
    </fieldset>
  );
};

export default InspectionDriver;
