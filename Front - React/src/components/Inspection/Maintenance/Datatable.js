import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SelectVehicle from './SelectVehicle';
import DataTable from 'react-data-table-component';

const DatatableMaintenance = () => {
  const [vehicles, setVehicles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    fetchVehicles(); // Cargar todos los vehículos inicialmente
  }, []);

  const fetchVehicles = (plate = '') => {
    // Llama a la API, si `plate` está vacío trae todos los vehículos
    axios.get(`/api/vehicles${plate ? `?plate=${plate}` : ''}`)
      .then((response) => {
        setVehicles(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los vehículos", error);
      });
  };

  const handleSelectVehicle = (plate) => {
    setSelectedVehicle(plate);
    fetchVehicles(plate); // Filtrar vehículos por la placa seleccionada
  };

  const columns = [
    { name: 'Placa', selector: 'plate', sortable: true },
    { name: 'Marca', selector: 'brand', sortable: true },
    { name: 'Modelo', selector: 'model', sortable: true },
    { name: 'Año', selector: 'year', sortable: true },
    // Otros campos que desees mostrar
  ];

  return (
    <div className="p-6">
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4" onClick={() => setShowModal(true)}>
        Seleccionar Vehículo
      </button>

      {showModal && <SelectVehicle onClose={() => setShowModal(false)} onSelectVehicle={handleSelectVehicle} />}

      <DataTable
        columns={columns}
        data={vehicles}
        pagination
        title={selectedVehicle ? `Datos del vehículo: ${selectedVehicle}` : 'Todos los vehículos'}
      />
    </div>
  );
};

export default DatatableMaintenance;
