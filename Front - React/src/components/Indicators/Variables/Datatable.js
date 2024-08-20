import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import Sidebar from "../../../containers/Sidebar";
import Navbar from "../../../containers/Navbar";
import { GetVariables } from "../../../controllers/Indicators/Variables/GetVariables";
import FilterControls from "./FilterControls";

const DataTableIndicators = () => {
  const tableRef = useRef();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetVariables();
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
        { title: "Id variable", data: "id_variable" },
        { title: "Nombre Variable", data: "nombre" },
        { title: "Id Indicador Relacionado", data: "indicador_id" },
        { title: "Nombre Indicador", data: "nombre_indicador" },
        { title: "Valor", data: "valor" },
        {
          title: "Periodo",
          data: "periodo",
          render: function (data, type, row) {
            // Asumiendo que la fecha viene en formato "YYYY-MM-DD" o similar
            if (data) {
              const date = new Date(data);
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, "0"); // Añade 1 porque los meses van de 0 a 11
              const day = String(date.getDate()).padStart(2, "0");

              return `${year}/${month}/${day}`;
            }
            return data;
          },
        },
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
      const itemDate = new Date(item.periodo);
      const itemMonth = itemDate.getMonth() + 1; // getMonth() is 0-indexed
      const itemYear = itemDate.getFullYear();
      return (
        (selectedMonth ? itemMonth === parseInt(selectedMonth) : true) &&
        (selectedYear ? itemYear === parseInt(selectedYear) : true)
      );
    });
    setFilteredData(filtered);
  }, [selectedMonth, selectedYear, data]);

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
            />

            <table
              id="example"
              className="display w-full table-auto border-collapse"
              ref={tableRef}
            >
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-4 py-2">Id variable</th>
                  <th className="px-4 py-2">Nombre Variable</th>
                  <th className="px-4 py-2">Id Indicador Relacionado</th>
                  <th className="px-4 py-2">Indicador Relacionado</th>
                  <th className="px-4 py-2">Valor</th>
                  <th className="px-4 py-2">Periodo</th>
                </tr>
              </thead>
              <tbody className="bg-white text-gray-700"></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTableIndicators;
