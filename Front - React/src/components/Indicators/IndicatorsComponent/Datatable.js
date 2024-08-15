import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import Sidebar from "../../../containers/Sidebar";
import Navbar from "../../../containers/Navbar";
import { GetIndicators } from "../../../controllers/Indicators/Indicators/GetIndicators";
import InputModal from "./InputModal"; // Import the new modal component

const DataTableIndicators = () => {
  const tableRef = useRef();
  const [data, setData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetIndicators();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []); // Empty dependency array ensures one-time execution

  useEffect(() => {
    const tableElement = tableRef.current;
    const dataTable = $(tableElement).DataTable({
      data: data,
      columns: [
        { title: "ID indicador", data: "id_indicador" },
        { title: "Nombre indicador", data: "nombre_indicador" },
        { title: "Frecuencia", data: "frecuencia" },
        { title: "Valor", data: "valor" },
        { title: "Periodo", data: "periodo_inicio" },
      ],
      responsive: true,
      destroy: false, // Don't destroy on initial render
      paging: true,
      searching: true,
      ordering: true,
      scrollX: true, // Habilita el desplazamiento horizontal
      columnDefs: [
        // ... column width definitions
      ],
    });

    // Populate table body with data
    $(tableElement).DataTable().rows.add(data).draw();

    // Destruir DataTable en desmontaje para evitar errores de memoria
    return () => {
      if (dataTable) {
        dataTable.destroy(false);
      }
    };
  }, [data]);

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
            <table
              id="example"
              className="display w-full table-auto border-collapse"
              ref={tableRef} // Add reference for DataTable initialization
            >
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-4 py-2">Id_indicador</th>
                  <th className="px-4 py-2">Nombre Indicador</th>
                  <th className="px-4 py-2">Frecuencia</th>
                  <th className="px-4 py-2">Valor</th>
                  <th className="px-4 py-2">Periodo</th>
                </tr>
              </thead>
              <tbody className="bg-white text-gray-700"></tbody>
            </table>
          </div>
        </div>
        <InputModal isOpen={modalIsOpen} onRequestClose={closeModal} />
      </div>
    </div>
  );
};

export default DataTableIndicators;