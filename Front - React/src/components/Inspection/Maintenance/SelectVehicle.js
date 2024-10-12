import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SelectVehicle = ({ onClose, onSelectVehicle }) => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedPlate, setSelectedPlate] = useState('');

  useEffect(() => {
    // Llama a la API para obtener todas las placas de los vehículos
    axios.get('http://localhost:8000/vehicles')
      .then((response) => {
        setVehicles(response.data); // Asume que response.data tiene una lista de vehículos
      })
      .catch((error) => {
        console.error("Error al obtener los vehículos", error);
      });
  }, []);

  const handleConfirm = () => {
    // Llama a la función para seleccionar el vehículo
    onSelectVehicle(selectedPlate);
    onClose(); // Cierra el modal
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Seleccionar Vehículo</h2>
        <select 
          className="border border-gray-300 rounded-md p-2 w-full mb-4"
          value={selectedPlate}
          onChange={(e) => setSelectedPlate(e.target.value)}
        >
          <option value="">Todos los vehículos</option>
          {vehicles.map(vehicle => (
            <option key={vehicle.vehicle_id} value={vehicle.license_plate}>{vehicle.license_plate}</option>
          ))}
        </select>
        <div className="flex justify-end">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2" onClick={handleConfirm}>
            Confirmar
          </button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectVehicle;
