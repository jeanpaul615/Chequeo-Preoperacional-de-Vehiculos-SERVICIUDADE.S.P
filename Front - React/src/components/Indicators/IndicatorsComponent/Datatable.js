import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import Sidebar from "../../../containers/Sidebar";
import Navbar from "../../../containers/Navbar";
import { GetIndicators } from "../../../controllers/Indicators/Indicators/GetIndicators";
import InputModal from "./InputModal";
import FilterControls from "./FilterControls";

const DataTableIndicators = () => {
  const tableRef = useRef();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedFrequency, setSelectedFrequency] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetIndicators();
        setData(result);
        setFilteredData(result); // Initial filter
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const tableElement = tableRef.current;

    // Initialize DataTable
    const dataTable = $(tableElement).DataTable({
      data: filteredData,
      columns: [
        { title: "ID indicador", data: "id_indicador" },
        { title: "Nombre indicador", data: "nombre_indicador" },
        { title: "Frecuencia", data: "frecuencia" },
        { title: "Valor", data: "valor" },
        { title: "Periodo", data: "periodo_inicio" },
      ],
      responsive: true,
      paging: true,
      searching: true,
    });

    // Destroy DataTable on unmount
    return () => {
      if (dataTable) {
        dataTable.destroy();
      }
    };
  }, [filteredData]);

  useEffect(() => {
    // Filter data based on the selected month, year, and frequency
    const filtered = data.filter((item) => {
      const itemDate = new Date(item.periodo_inicio);
      const itemMonth = itemDate.getMonth() + 1; // getMonth() is 0-indexed
      const itemYear = itemDate.getFullYear();
      return (
        (selectedMonth ? itemMonth === parseInt(selectedMonth) : true) &&
        (selectedYear ? itemYear === parseInt(selectedYear) : true) &&
        (selectedFrequency ? item.frecuencia === selectedFrequency : true)
      );
    });
    setFilteredData(filtered);
  }, [selectedMonth, selectedYear, selectedFrequency, data]);

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
            <FilterControls
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              selectedFrequency={selectedFrequency}
              setSelectedFrequency={setSelectedFrequency}
              openModal={openModal}
            />

            <table
              id="example"
              className="display w-full table-auto border-collapse"
              ref={tableRef}
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
