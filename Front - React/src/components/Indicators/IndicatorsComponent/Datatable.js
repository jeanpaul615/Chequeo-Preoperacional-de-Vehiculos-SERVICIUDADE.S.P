import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import $ from "jquery";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import Sidebar from "../../../containers/Sidebar";
import Navbar from "../../../containers/Navbar";
import { GetIndicators } from "../../../controllers/Indicators/Indicators/GetIndicators";
import FilterControls from "./FilterControls";
import { DeleteIndicator } from "../../../controllers/Indicators/Indicators/DeleteIndicator";
import Swal from "sweetalert2";
import Loading from "../../../containers/Loading";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import RoleVerify from "../../../containers/RoleVerify";

const ContainerStats = lazy(() => import("./Stats/ContainerStats"));
const ModalUpdate = lazy(() => import("./ModalUpdate"));
const InputModal = lazy(() => import("./InputModal"));

const DataTableIndicators = () => {
  const tableRef = useRef();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalUpdateIsOpen, setModalUpdateIsOpen] = useState(false);
  const [modalStatsIsOpen, setModalStatsIsOpen] = useState(false);
  const [selectedIndicator, setSelectedIndicator] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedFrequency, setSelectedFrequency] = useState("");
  const roleUser = RoleVerify();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
      pagingType: "full_numbers", // Use full_numbers pagination style
      lengthMenu: [10, 25, 50, 75, 100, 1000], // Options for rows per page
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
        (selectedFrequency ? item.frecuencia === selectedFrequency : true) &&
        (selectedIndicator
          ? item.id_indicador === parseInt(selectedIndicator)
          : true)
      );
    });
    setFilteredData(filtered);
  }, [selectedMonth, selectedYear, selectedFrequency, selectedIndicator, data]);

  const openModal = () => {
    setModalIsOpen(true);
  };
  const HandleStatsOpen = () => {
    setModalStatsIsOpen(true);
  };

  const HandleStatsClose = () => {
    setModalStatsIsOpen(false);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(10);
    doc.text("Lista de Inspecciones", 20, 20);
    let yPosition = 30;
    const lineHeight = 10;
    const pageHeight = doc.internal.pageSize.height;
    const marginBottom = 20;

    data.forEach((item, index) => {
      const text = `${index + 1}. ID: ${item.id_indicador}, Nombre Indicador: ${item.nombre_indicador}, Frecuencia: ${item.frecuencia}, Valor: ${item.valor}, Periodo: ${item.periodo_inicio}`;
      if (yPosition > pageHeight - marginBottom) {
        doc.addPage();
        yPosition = 20;
      }
      const splitText = doc.splitTextToSize(text, 180);
      doc.text(splitText, 20, yPosition);
      yPosition += lineHeight;
    });
    doc.save("indicadores.pdf");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const exportToExcel = () => {
    const inspectionInSpanish = data.map((item) => ({
      "ID Indicador": item.id_indicador,
      "Nombre Indicador": item.nombre_indicador,
      "Nombre": item.driver_name,
      "Frecuencia": item.frecuencia,
      "Valor": item.valor,
      "Periodo": item.periodo_inicio,
    }));
    const worksheet = XLSX.utils.json_to_sheet(inspectionInSpanish);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Indicadores");
    XLSX.writeFile(workbook, "indicadores.xlsx");
  };


return (
  <div>
    <Sidebar />
    <div className="pt-8 md:ml-72 ml-4 text-sm md:mr-5 mr-5">
      <Navbar Title={"Indicadores"} />
      <div className="flex justify-between items-center gap-4 mb-4">
        <div className="flex items-center">
          <button
            onClick={HandleStatsOpen}
            className="flex justify-center items-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
            type="button"
          >
            <svg
              className="w-6 h-6 pr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill=""
                d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64L0 400c0 44.2 35.8 80 80 80l400 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 416c-8.8 0-16-7.2-16-16L64 64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z"
              />
            </svg>
            Ver estadísticas
          </button>
        </div>

        {(roleUser === 'ADMIN' || roleUser === 'AUDITOR') && (
            <div className="relative inline-block text-left float-right ml-2">
              <button
                type="button"
                onClick={toggleDropdown}
                className="flex justify-center items-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                id="menu-button"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Exportar
              </button>
  
              {/* Menú desplegable */}
              {isDropdownOpen && (
                <div className="absolute right-0 z-10 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative inline-block text-left">
                    <button
                      onClick={exportToPDF}
                      className="w-full flex items-center justify-center text-sm font-medium text-gray-700 bg-white rounded-lg hover:bg-red-500 hover:text-white transition-colors duration-200 px-2 py-1 mr-2"
                      role="menuitem"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 2v20l6-6h6a2 2 0 002-2V8a2 2 0 00-2-2h-6L6 2z"
                        />
                      </svg>
                      PDF
                    </button>
                    <button
                      onClick={exportToExcel}
                      className="w-full flex items-center justify-center text-sm font-medium text-gray-700 bg-white rounded-lg hover:bg-green-500 hover:text-white transition-colors duration-200 px-2 py-1"
                      role="menuitem"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 12l8-4v8l-8 4-8-4V8l8 4z"
                        />
                      </svg>
                      Excel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4">
          <FilterControls
            data={data}
            selectedIndicator={selectedIndicator}
            setSelectedIndicator={setSelectedIndicator}
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

    <Suspense fallback={<Loading />}>
      <InputModal isOpen={modalIsOpen} onRequestClose={closeModal} />
    </Suspense>
    <Suspense fallback={<Loading />}>
      <ModalUpdate
        isOpen={modalUpdateIsOpen}
        onRequestClose={() => setModalUpdateIsOpen(false)}
        indicator={selectedIndicator}
      />
    </Suspense>
    {modalStatsIsOpen && (
      <Suspense fallback={<Loading />}>
        <ContainerStats
          closeModal={HandleStatsClose}
          indicators={data} // Pass the entire data to the modal
        />
      </Suspense>
    )}
  </div>
);

};

export default DataTableIndicators;
