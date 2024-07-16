import React, { useEffect } from "react";
import $ from 'jquery';
import 'datatables.net-dt';
import 'datatables.net-responsive-dt';
import Sidebar from "../../containers/Sidebar";

const DataTableIndicators = () => {
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
      <div className="justify-center items-center flex mb-8">
        <h2 className="relative text-center text-3xl font-extrabold text-blue-500">
          INDICADORES
        </h2>
        <h2 className="absolute pl-1 text-center text-3xl font-extrabold text-orange-400">
          INDICADORES
        </h2>
      </div>
      <Sidebar />
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table id="example" className="display w-full table-auto border-collapse">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2">Id_indicador</th>
              <th className="px-4 py-2">Indicador</th>
              <th className="px-4 py-2">Frecuencia</th>
              <th className="px-4 py-2">Formula</th>
              <th className="px-4 py-2">Periodo</th>
              <th className="px-4 py-2">Valor del Indicador</th>
            </tr>
          </thead>
          <tbody className="bg-white text-gray-700">
            <tr className="border-t">
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-2">Indicador Siniestros Viales TSV</td>
              <td className="px-4 py-2">Anual</td>
              <td className="px-4 py-2">SV * K / KM</td>
              <td className="px-4 py-2">2024</td>
              <td className="px-4 py-2">8.86525</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTableIndicators;
