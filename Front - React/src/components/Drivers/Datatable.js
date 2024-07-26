import React, { useEffect, useState, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import Sidebar from '../../containers/Sidebar';
import { GetDrivers } from '../../controllers/GetControllers/Driver';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import Navbar from '../../containers/Navbar';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const DatatableDrivers = () => {
  const tableRef = useRef();
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetDrivers();
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
        { title: 'ID conductor', data: 'driver_id' },
        { title: 'Nombre', data: 'name' },
        { title: 'Licencia', data: 'license_until' },
        { title: 'Seguridad Social', data: 'seguridad_social_until' },
        { title: 'Fecha Creación', data: 'created_at' },
        { title: 'Fecha Actualización', data: 'updated_at' },
      ],
      destroy: true, // Destruye la instancia anterior antes de crear una nueva
    });
  
    // Destruir DataTable en desmontaje para evitar errores de memoria
    return () => {
      if (dataTable) {
        dataTable.destroy(false);
      }
    };
  }, [data]);

  // Configura los datos de la gráfica
  const chartData = {
    labels: data.map(item => item.name), // Labels del gráfico
    datasets: [
      {
        label: 'Licencia Hasta',
        data: data.map(item => item.license_until), // Datos para la gráfica
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Licencia Hasta: ${context.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex mt-8">
      <Sidebar />
      <div className="flex-1 md:ml-72 ml-4 text-sm md:mr-5 mr-5">
        <Navbar Title={"Conductores"}/>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table ref={tableRef} className="display w-full table-auto border-collapse">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2">ID conductor</th>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Licencia</th>
                <th className="px-4 py-2">Seguridad Social</th>
                <th className="px-4 py-2">Fecha Creación</th>
                <th className="px-4 py-2">Fecha Actualización</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-700">
              {/* El cuerpo de la tabla será llenado automáticamente por DataTable */}
            </tbody>
          </table>
        </div>
        <div className="mt-12">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default DatatableDrivers;
