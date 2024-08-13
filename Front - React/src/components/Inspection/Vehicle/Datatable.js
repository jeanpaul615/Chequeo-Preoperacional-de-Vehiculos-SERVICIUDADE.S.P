import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import Sidebar from '../../../containers/Sidebar';
import { GetVehicles } from '../../../controllers/DashboardControllers/Vehicle';
import Navbar from '../../../containers/Navbar';

// Función para formatear la fecha
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const DatatableVehicles = () => {
  const tableRef = useRef();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetVehicles();
        const formattedData = result.map(item => ({
          ...item,
          soat_until: formatDate(item.soat_until),
          rtm_until: formatDate(item.rtm_until),
          seguro_contractual_until: formatDate(item.seguro_contractual_until),
          seguro_extracontractual_until: formatDate(item.seguro_extracontractual_until),
          created_at: formatDate(item.created_at),
          updated_at: formatDate(item.updated_at),
        }));
        setData(formattedData); // Establece los datos formateados en el estado
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
        { title: 'Seguro Contractual', data: 'seguro_contractual_until' },
        { title: 'Seguro Extracontractual', data: 'seguro_extracontractual_until' },
        { title: 'Fecha Creación', data: 'created_at' },
        { title: 'Fecha Actualización', data: 'updated_at' },
      ],
      responsive: true,
      destroy: true, // Destruye la instancia anterior antes de crear una nueva
      paging: true,
      searching: true,
      ordering: true,
      scrollX: true, // Habilita el desplazamiento horizontal
      columnDefs: [
        { width: '8%', targets: 0 }, // Ajusta el ancho de la primera columna (ID vehiculo)
        { width: '10%', targets: 1 }, // Ajusta el ancho de la segunda columna (Tipo)
        { width: '10%', targets: 2 }, // Ajusta el ancho de la tercera columna (Placa)
        { width: '10%', targets: 3 }, // Ajusta el ancho de la cuarta columna (Marca)
        { width: '10%', targets: 4 }, // Ajusta el ancho de la quinta columna (Area)
        { width: '10%', targets: 5 }, // Ajusta el ancho de la sexta columna (Soat)
        { width: '10%', targets: 6 }, // Ajusta el ancho de la séptima columna (RTM)
        { width: '10%', targets: 7 }, // Ajusta el ancho de la octava columna (Contractual)
        { width: '10%', targets: 8 }, // Ajusta el ancho de la novena columna (Extracontractual)
        { width: '10%', targets: 9 }, // Ajusta el ancho de la décima columna (Fecha Creación)
        { width: '10%', targets: 10 }, // Ajusta el ancho de la undécima columna (Fecha Actualización)
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
    <div className="flex flex-col md:flex-row md:mt-8 h-screen w-full overflow-hidden">
      <Sidebar />
      <div className="flex-1 md:ml-72 text-sm md:mr-5 mr-5 overflow-x-auto">
        <Navbar Title={"Vehículos"} />
        <div className="bg-white shadow-md rounded-lg overflow-x-auto mt-5 md:mt-0">
          <div className="overflow-x-auto">
            <table ref={tableRef} className="display w-full table-auto border-collapse">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-4 py-2">ID vehiculo</th>
                  <th className="px-4 py-2">Tipo</th>
                  <th className="px-4 py-2">Placa</th>
                  <th className="px-4 py-2">Marca</th>
                  <th className="px-4 py-2">Area</th>
                  <th className="px-4 py-2">Soat</th>
                  <th className="px-4 py-2">RTM</th>
                  <th className="px-4 py-2">Contractual</th>
                  <th className="px-4 py-2">Extracontractual</th>
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
    </div>
  );
};

export default DatatableVehicles;
