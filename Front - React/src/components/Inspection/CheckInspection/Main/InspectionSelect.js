import React from "react";

/**
 * Componente de selección para inspección.
 * Este componente renderiza un menú desplegable para seleccionar el estado de un elemento.
 * Permite elegir entre "Bien", "Mal" o "No aplica".
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.label - La etiqueta para el elemento select (no utilizada en este componente, pero puede ser útil para futuras implementaciones).
 * @param {string} props.name - El nombre del campo select, que se usa para la identificación y en la gestión de cambios.
 * @param {string} props.value - El valor actualmente seleccionado en el campo select.
 * @param {function} props.handleChange - Función de manejo de cambios para actualizar el estado del formulario.
 * 
 * @returns {JSX.Element} - El componente select renderizado.
 */
export default function InspectionSelect({ label, name, value, handleChange }) {
  return (
    <div className="mb-4">
      <select
        id={name} // Identificador único del campo select
        name={name} // Nombre del campo select, utilizado en la gestión de cambios
        value={value} // Valor actualmente seleccionado
        onChange={handleChange} // Función llamada cuando se selecciona una opción
        className="bg-gray-50 border font-medium border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required // Indica que el campo es obligatorio
      >
        <option className="font-medium" value="Bien">Bien</option> 
        <option className="font-medium" value="Mal">Mal</option>
        <option className="font-medium" value="Noaplica">No aplica</option>
      </select>
    </div>
  );
};
