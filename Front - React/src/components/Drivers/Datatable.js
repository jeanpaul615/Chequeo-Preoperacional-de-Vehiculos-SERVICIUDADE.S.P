import React, { useEffect, useRef } from 'react';
import $ from "jquery";
import "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import Sidebar from '../../containers/Sidebar';

const DatatableDrivers = ({ data }) => {
  const tableRef = useRef();

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
      // Agrega más columnas según tus datos
    });

    // Destruir DataTable en desmontaje para evitar errores de memoria
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
            CONDUCTORES
          </h2>
          <h2 className="absolute pl-1 text-center text-3xl font-extrabold text-orange-400">
            CONDUCTORES
          </h2>
        </div>
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
      </div>
    </div>
  );
};

export default DatatableDrivers;
