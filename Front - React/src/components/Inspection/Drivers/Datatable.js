import React, { useEffect, useState, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import Sidebar from '../../../containers/Sidebar';
import { GetDrivers } from '../../../controllers/Inspection/DashboardControllers/Driver';
import Navbar from '../../../containers/Navbar';

const DatatableDrivers = () => {
  const tableRef = useRef();
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetDrivers();
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
        { title: 'ID conductor', data: 'driver_id' },
        {title: 'ID Usuario', data: 'user_id'},
        { title: 'Nombre', data: 'name' },
        { title: 'Licencia', data: 'license_until' },
        { title: 'Seguridad Social', data: 'seguridad_social_until' },
        { title: 'Fecha Creación', data: 'created_at' },
        { title: 'Fecha Actualización', data: 'updated_at' },
      ],
      responsive: true,
      destroy: true, // Destruye la instancia anterior antes de crear una nueva
      scrollX: true, // Habilita el desplazamiento horizontal
      columnDefs: [
        { width: '10%', targets: 0 }, // Ajusta el ancho de la primera columna (ID conductor)
        { width: '20%', targets: 1 }, // Ajusta el ancho de la segunda columna (Nombre)
        { width: '15%', targets: 2 }, // Ajusta el ancho de la tercera columna (Licencia)
        { width: '20%', targets: 3 }, // Ajusta el ancho de la cuarta columna (Seguridad Social)
        { width: '15%', targets: 4 }, // Ajusta el ancho de la quinta columna (Fecha Creación)
        { width: '15%', targets: 5 }, // Ajusta el ancho de la sexta columna (Fecha Actualización)
      ],
    });
  
    // Destruir DataTable en desmontaje para evitar errores de memoria
    return () => {
      if (dataTable) {
        dataTable.destroy(false);
      }
    };
  }, [data]);

  return (
    <div className="flex flex-col md:flex-row mt-8">
      <Sidebar />
      <div className="flex-1 md:ml-72 ml-4 text-sm md:mr-5 mr-5 overflow-x-auto">
        <Navbar Title={"Conductores"} />
        <button
          className="bg-green-500 hover:bg-gray-800 text-white focus:ring-2 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center w-full md:w-auto"
        >
          Nuevo Conductor
        </button>

        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table ref={tableRef} className="display w-full table-auto border-collapse">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-2 py-1">ID conductor</th>
                <th className="px-2 py-1">ID Usuario</th>
                <th className="px-2 py-1">Nombre</th>
                <th className="px-2 py-1">Licencia</th>
                <th className="px-2 py-1">Seguridad Social</th>
                <th className="px-2 py-1">Fecha Creación</th>
                <th className="px-2 py-1">Fecha Actualización</th>
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

export default DatatableDrivers;
