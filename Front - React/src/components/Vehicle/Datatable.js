import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import Sidebar from '../../containers/Sidebar';
import { GetVehicles } from '../../controllers/GetControllers/Vehicle';

const DatatableVehicles = () => {
  const tableRef = useRef();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetVehicles();
        console.log(result); // Verifica la estructura de los datos
        setData(result); // Establece los datos en el estado
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  

  useEffect(() => {
    const tableElement = tableRef.current;

    const dataTable = $(tableElement).DataTable({
      data: data,
      columns: [
        { title: 'ID vehiculo', data: 'vehicle_id' },
        { title: 'Tipo', data: 'type' },
        { title: 'Placa', data: 'license_plate' },
        { title: 'Marca', data: 'brand' },
        { title: 'Area', data: 'area' },
        { title: 'Vigencia Soat', data: 'soat_until' },
        { title: 'Vigencia RTM', data: 'rtm_until' },
        { title: 'Vigencia Seguro Contractual', data: 'seguro_contractual_until' },
        { title: 'Vigencia Seguro Extracontractual', data: 'seguro_extracontractual_until' },
        { title: 'Fecha Creación', data: 'created_at' },
        { title: 'Fecha Actualización', data: 'updated_at' },
      ],
      destroy: true, // Destruye la instancia anterior antes de crear una nueva
    });

    return () => {
      if (dataTable) {
        dataTable.destroy(false);
      }
    };
  }, [data]);

  return (
    <div className="flex mt-20">
      <Sidebar />
      <div className="flex-1 md:ml-72 ml-4 text-sm md:mr-5 mr-5">
        <div className="justify-center items-center flex mb-8">
          <h2 className="relative text-center text-3xl font-extrabold text-blue-500">
            VEHÍCULOS
          </h2>
          <h2 className="absolute pl-1 text-center text-3xl font-extrabold text-orange-400">
            VEHÍCULOS
          </h2>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table ref={tableRef} className="display w-full table-auto border-collapse">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2">ID vehiculo</th>
                <th className="px-4 py-2">Tipo</th>
                <th className="px-4 py-2">Placa</th>
                <th className="px-4 py-2">Marca</th>
                <th className="px-4 py-2">Area</th>
                <th className="px-4 py-2">Vigencia Soat</th>
                <th className="px-4 py-2">Vigencia RTM</th>
                <th className="px-4 py-2">Seguro Contractual</th>
                <th className="px-4 py-2">Seguro Extracontractual</th>
                <th className="px-4 py-2">Fecha Creación</th>
                <th className="px-4 py-2">Fecha Actualización</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-700">
              {/* El cuerpo de la tabla será llenado automáticamente por DataTable */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DatatableVehicles;
