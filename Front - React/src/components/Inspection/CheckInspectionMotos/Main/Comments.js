import React from 'react';

/**
 * Componente para mostrar las observaciones generadas en el formulario.
 * Este componente renderiza el texto de observaciones basadas en los ítems que están en "malo".
 */
const Comments = ({ observations, handleObservationChange }) => {
  return (
    <div className="md:ml-72 bg-gray-100 p-4 rounded-lg border border-gray-300">
      <h3 className="text-lg font-semibold mb-4">Observaciones</h3>
      {Object.keys(observations).map((item) => (
        <div key={item} className="mb-4">
          <label className="block text-sm font-medium mb-2">{item}</label>
          <textarea
            name={item}
            value={observations[item]}
            onChange={handleObservationChange}
            placeholder={`Comentario para ${item}`}
            className="w-full h-12 p-3 border font-medium text-sm border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-150 ease-in-out"
          />
        </div>
      ))}
    </div>
  );
};

export default Comments;
