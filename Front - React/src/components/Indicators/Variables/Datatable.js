import React, { useEffect } from "react";
import $ from 'jquery';
import 'datatables.net-dt';
import 'datatables.net-responsive-dt';
import Sidebar from "../../../containers/Sidebar";
import Navbar from "../../../containers/Navbar";

const DataTableVariables = () => {
  useEffect(() => {
    // Verificar si la tabla ya está inicializada y destruirla si es necesario
    if ($.fn.DataTable.isDataTable('#example')) {
      $('#example').DataTable().destroy();
    }

    // Inicializar DataTables con responsividad
    $('#example').DataTable({
      responsive: true
    });
  }, []);

  return (
    <div className="pt-12 md:ml-72 ml-4 text-sm md:mr-5 mr-5">
      <Navbar Title={"Variables"}/>
      <Sidebar />
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table id="example" className="display w-full table-auto border-collapse">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2">Id_Variables</th>
              <th className="px-4 py-2">Indicador Relacionado</th>
              <th className="px-4 py-2">Variable</th>
              <th className="px-4 py-2">Frecuencia</th>
              <th className="px-4 py-2">Periodo</th>
              <th className="px-4 py-2">Valor de Variable</th>
            </tr>
          </thead>
          <tbody className="bg-white text-gray-700">
            <tr className="border-t">
              <td className="px-4 py-2">2</td>
              <td className="px-4 py-2">Indicador Siniestros Viales TSV</td>
              <td className="px-4 py-2">K: Constante 1000000 Km</td>
              <td className="px-4 py-2">Anual</td>
              <td className="px-4 py-2">2024</td>
              <td className="px-4 py-2">20</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTableVariables;
