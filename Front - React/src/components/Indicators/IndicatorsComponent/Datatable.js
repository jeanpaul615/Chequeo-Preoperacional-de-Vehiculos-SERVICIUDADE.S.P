import React, { useEffect, useState } from "react";
import $ from 'jquery';
import 'datatables.net-dt';
import 'datatables.net-responsive-dt';
import Sidebar from "../../../containers/Sidebar";
import Navbar from "../../../containers/Navbar";
import InputModal from './InputModal'; // Import the new modal component

const DataTableIndicators = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false); // State to control modal visibility

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

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
  <div>
    <Sidebar />
    <div className="pt-8 md:ml-72 ml-4 text-sm md:mr-5 mr-5">
      <Navbar Title={"Indicadores"} />
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4">
          <button
            onClick={openModal}
            className="bg-green-500 text-white p-2 rounded mb-4"
          >
            Ingresar Datos
          </button>
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
      <InputModal isOpen={modalIsOpen} onRequestClose={closeModal} />
    </div>
    </div>
);
};

export default DataTableIndicators;
