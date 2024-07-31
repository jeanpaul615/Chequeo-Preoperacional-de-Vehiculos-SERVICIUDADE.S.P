import React from "react";

const InspectionVehicule = ({ formData, handleChange }) => {
  return (
    <fieldset className="mb-6 p-5 border rounded-lg shadow-md">
      <h1 className="text-normal font-bold normal mb-4">Datos del Vehículo</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="mb-6">
          <label
            htmlFor="tipo_vehiculo"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Tipo de Vehículo:
          </label>
          <select
            id="tipo_vehiculo"
            name="tipo_vehiculo"
            value={formData.tipo_vehiculo}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:font-semibold dark:focus:ring-primary-500 dark:focus:border-primary-500"
            required
          >
            <option value="">Seleccione el vehículo</option>
            <option value="RECOLECTOR">Recolector</option>
            <option value="VOLQUETA">Volqueta</option>
            <option value="CAMIONETA">Camioneta</option>
            <option value="MOTO">Moto</option>

          </select>
        </div>
        <div className="mb-6">
          <label
            htmlFor="placa"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Placa:
          </label>
          <input
            type="text"
            id="placa"
            name="placa"
            value={formData.placa}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:font-semibold dark:focus:ring-primary-500 dark:focus:border-primary-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="marca"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Marca:
          </label>
          <input
            type="text"
            id="marca"
            name="marca"
            value={formData.marca}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:font-semibold dark:focus:ring-primary-500 dark:focus:border-primary-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="dependencia"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Dependencia:
          </label>
          <select
            type="text"
            id="dependencia"
            name="dependencia"
            value={formData.dependencia}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:font-semibold dark:focus:ring-primary-500 dark:focus:border-primary-500"
            required
            >
            <option value="">Seleccione la Dependencia</option>
            <option value="ACUEDUCTO">Acueducto</option>
            <option value="ALCANTARILLADO">Alcantarillado</option>
            <option value="ASEO">Aseo</option>

          </select>
        </div>
        <div className="mb-6">
          <label
            htmlFor="kilometraje"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Kilometraje:
          </label>
          <input
            type="number"
            id="kilometraje"
            name="kilometraje"
            value={formData.kilometraje}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:font-semibold dark:focus:ring-primary-500 dark:focus:border-primary-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="soat"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            SOAT:
          </label>
          <input
            type="text"
            id="soat"
            name="soat"
            value={formData.soat}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:font-semibold dark:focus:ring-primary-500 dark:focus:border-primary-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="rtm"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            RTM:
          </label>
          <input
            type="text"
            id="rtm"
            name="rtm"
            value={formData.rtm}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:font-semibold dark:focus:ring-primary-500 dark:focus:border-primary-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="seguro_contractual"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Seguro Contractual:
          </label>
          <input
            type="text"
            id="seguro_contractual"
            name="seguro_contractual"
            value={formData.seguro_contractual}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:font-semibold dark:focus:ring-primary-500 dark:focus:border-primary-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="seguro_extracontractual"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Seguro Extracontractual:
          </label>
          <input
            type="text"
            id="seguro_extracontractual"
            name="seguro_extracontractual"
            value={formData.seguro_extracontractual}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:font-semibold dark:focus:ring-primary-500 dark:focus:border-primary-500"
            required
          />
        </div>
      </div>
    </fieldset>
  );
};

export default InspectionVehicule;
