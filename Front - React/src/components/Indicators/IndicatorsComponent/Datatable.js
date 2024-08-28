import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import Sidebar from "../../../containers/Sidebar";
import Navbar from "../../../containers/Navbar";
import { GetIndicators } from "../../../controllers/Indicators/Indicators/GetIndicators";
import InputModal from "./InputModal";
import FilterControls from "./FilterControls";
import ModalUpdate from "./ModalUpdate";
import { DeleteIndicator } from "../../../controllers/Indicators/Indicators/DeleteIndicator";
import Swal from "sweetalert2";

const DataTableIndicators = () => {
  const tableRef = useRef();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalUpdateIsOpen, setModalUpdateIsOpen] = useState(false);
  const [selectedIndicator, setSelectedIndicator] = useState(null);

  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedFrequency, setSelectedFrequency] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetIndicators(); // Fetch indicators to display in the table
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
        { title: "ID Registro", data: "id_registro" },
        { title: "ID Indicador", data: "id_indicador" },
        { title: "Nombre Indicador", data: "nombre_indicador" },
        { title: "Frecuencia", data: "frecuencia" },
        { title: "Valor", data: "valor" },
        {
          title: "Periodo",
          data: "periodo_inicio",
          render: function (data) {
            if (data) {
              const date = new Date(data);
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, "0");
              const day = String(date.getDate()).padStart(2, "0");

              return `${year}/${month}/${day}`;
            }
            return data;
          },
        },
        {
          title: "Opciones",
          data: null,
          render: function (data, type, row) {
            return `
              <button type="button" class="hover:text-white bg-gray-100 hover:bg-blue-600 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-full text-sm px-2 py-1 text-center inline-flex items-center me-2 mb-2" data-id="${row.id_registro}" data-periodo="${row.periodo_inicio}">
                Actualizar
              </button>
              <button type="button" class="hover:text-white bg-gray-100 hover:bg-red-600 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-full text-sm px-2 py-1 text-center inline-flex items-center me-2 mb-2" data-id="${row.id_registro}">
                Eliminar
              </button>
            `;
          },
        },
      ],
      responsive: true,
      destroy: true,
      scrollX: true,
      columnDefs: [
        { width: "5%", targets: 0 }, 
        { width: "5%", targets: 1 }, 
        { width: "10%", targets: 2 }, 
        { width: "1%", targets: 3 }, 
        { width: "1%", targets: 4 }, 
        { width: "5%", targets: 5 },
        { width: "5%", targets: 6 },

      ],
    });

    $(tableElement).on("click", "button", function () {
      const id = $(this).data("id");

      const action = $(this).text().trim();

      const row = data.find((item) => item.id_registro === id);

      if (action === "Actualizar") {
        setSelectedIndicator({ ...row }); 
        setModalUpdateIsOpen(true);
      } else if (action === "Eliminar") {
        Swal.fire({
          title: "¿Estás seguro?",
          text: "No podrás revertir esto!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, eliminar!",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            if (row) {
              DeleteIndicator(row).then((response) => {
                if (response) {
                  window.location.reload();
                }
              });
            } else {
              Swal.fire(
                "Error",
                "No se encontró el dato para eliminar.",
                "error"
              );
            }
          }
        });
      }
    });

    // Destroy DataTable on unmount
    return () => {
      if (dataTable) {
        dataTable.destroy();
      }
    };
    // eslint-disable-next-line
  }, [filteredData]);

  useEffect(() => {
    // Filter data based on the selected month, year, and frequency
    const filtered = data.filter((item) => {
      const itemDate = new Date(item.periodo_inicio);
      const itemMonth = itemDate.getMonth() + 1;
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
    // Clear form
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
              <thead className="bg-gray-800 text-white text-right">
                <tr>
                  <th className="px-4 py-2">Id_indicador</th>
                  <th className="px-4 py-2">Nombre Indicador</th>
                  <th className="px-4 py-2">Frecuencia</th>
                  <th className="px-4 py-2">Valor</th>
                  <th className="px-4 py-2">Periodo</th>
                  <th className="px-4 py-2">Opciones</th>
                </tr>
              </thead>
              <tbody className="text-right bg-white text-gray-600 font-medium"></tbody>
            </table>
          </div>
        </div>
      </div>

      <InputModal isOpen={modalIsOpen} onRequestClose={closeModal} />
      <ModalUpdate
        isOpen={modalUpdateIsOpen}
        onRequestClose={() => setModalUpdateIsOpen(false)}
        indicator={selectedIndicator}
      />
    </div>
  );
};

export default DataTableIndicators;
