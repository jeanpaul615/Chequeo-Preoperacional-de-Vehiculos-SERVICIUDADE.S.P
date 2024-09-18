import React,{ useRef}  from "react";
import "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import Sidebar from "../../../containers/Sidebar";
import Navbar from "../../../containers/Navbar";


const DatatableInspection = () => {
  const tableRef = useRef(null);






  return (
    <div className="flex flex-col md:flex-row mt-8">
      <Sidebar />
      <div className="flex-1 md:ml-72 ml-4 text-sm md:mr-5 mr-5 overflow-x-auto">
        <Navbar Title={"Conductores"} />

        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table
            ref={tableRef}
            className="display w-full table-auto border-collapse"
          >
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-2 py-1">Id Usuario</th>
                <th className="px-2 py-1">Cedula</th>
                <th className="px-2 py-1">Nombre</th>
                <th className="px-2 py-1">Correo Electrónico</th>
                <th className="px-2 py-1">Rol</th>
                <th className="px-2 py-1">Estado</th>
                <th className="px-2 py-1">Licencia Válida Hasta</th>
                <th className="px-2 py-1">Opciones</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-600 font-medium">
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DatatableInspection;
