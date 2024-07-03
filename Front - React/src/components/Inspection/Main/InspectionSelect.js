import React from "react";

export default function InspectionSelect({ label, name, value, handleChange }){
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700 font-bold mb-2">{label}:</label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        required
      >
        <option value="">Selecciona una opción</option>
        <option value="Bien">Bien</option>
        <option value="Mal">Mal</option>
        <option value="Noaplica">No aplica</option>
      </select>
    </div>
  );
};
