import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "datatables.net-dt";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import Sidebar from "../../../containers/Sidebar";
import Navbar from "../../../containers/Navbar";
import { GetInspection } from "../../../controllers/Inspection/InspectionControllers/GetInspection";
import ModalChequeo from "./ModalChequeo";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import RoleVerify from "../../../containers/RoleVerify";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const DatatableInspection = () => {
  const tableRef = useRef(null);
  const navigate = useNavigate();
  const [inspection, setInspection] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedInspection, setSelectedInspection] = useState(null); // Almacenar la inspección seleccionada
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown
  const [isViewOnly, setIsViewOnly] = useState(false); // New state for view-only mode

  const roleUser = RoleVerify();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetInspection();
        setInspection(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleCheckClick = (row) => {
    if (!row.checked_by) {
      setSelectedInspection(row); // Establecer la inspección seleccionada
      setOpenModal(true); // Abrir modal
    }
  };
  
  const handleViewClick = (row) => {
    setSelectedInspection(row); // Store selected inspection
    setOpenModal(true); // Open modal
    setIsViewOnly(true); // Set to view-only mode
  };

  // Cerrar modal
  const closeModal = () => {
    setOpenModal(false);
    setSelectedInspection(null);
    setIsViewOnly(false); // Reset view-only state on close
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev); // Toggle dropdown visibility
  };

  const NewInspection = () => {
    navigate("/inspection"); // Redirigir después del restablecimiento exitoso
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Lista de Inspecciones", 20, 20);
    inspection.forEach((item, index) => {
      doc.text(
        `${index + 1}. ID: ${item.inspection_id}, Vehículo: ${
          item.license_plate
        },  Fecha: ${formatDate(item.created_at)}`,
        20,
        30 + index * 10
      );
    });
    doc.save("inspections.pdf");
  };

  const exportToExcel = () => {
    // Crear una copia del array de inspecciones con nombres de columnas en español
    const inspectionInSpanish = inspection.map((item) => ({
      "ID Inspección": item.inspection_id,
      "Vehículo": item.license_plate,
      "Kilometraje": item.mileage,
      "Conductor": item.driver_name,
      "Fecha Creación": formatDate(item.created_at),
      "Chequeado": item.checked_by || "Pendiente", // Mostrar "Pendiente" si no está chequeado
    }));
  
    // Crear la hoja de cálculo con los nuevos nombres de columnas
    const worksheet = XLSX.utils.json_to_sheet(inspectionInSpanish);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inspecciones");
    
    // Descargar el archivo Excel con nombre en español
    XLSX.writeFile(workbook, "inspecciones.xlsx");
  };
  

  useEffect(() => {
    if (inspection.length > 0) {
      const tableElement = tableRef.current;
  
      if ($.fn.DataTable.isDataTable(tableElement)) {
        $(tableElement).DataTable().destroy();
      }
  
      const columns = [
        { title: "ID Inspección", data: "inspection_id" },
        { title: "Vehículo", data: "license_plate" },
        { title: "Tipo de Vehículo", data: "type" },
        { title: "Kilometraje", data: "mileage" },
        { title: "Conductor", data: "driver_name" },
        {
          title: "Fecha Creación",
          data: "created_at",
          render: (data) => formatDate(data),
        },
      ];
  
      // Conditionally add the "Chequeado" column for Admin and Auditor roles
      if (roleUser === 'ADMIN' || roleUser === 'AUDITOR') {
        columns.push({
          title: "Chequeado",
          data: "checked_by",
          render: function (data, type, row) {
            if (!data) {
              return `
                <div class="btn-chequeo flex items-center justify-center">
                  <button class="flex items-center justify-center space-x-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-orange-600" title="Chequear">
                    <h1 class="text-xs font-semibold">Auditar</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" viewBox="0 0 512 512" fill="currentColor">
                      <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/>
                    </svg>
                  </button>
                </div>
              `;
            } else {
              return `
                <div class="btn-auditor flex items-center justify-center">
                  <button class="flex items-center justify-center bg-gray-500 text-white py-2 px-4 rounded" title="Auditor">
                    <h1 class="text-xs font-semibold">${data}</h1>
                  </button>
                </div>
              `;
            }
          },
        });
      }
  
      $(tableElement).DataTable({
        data: inspection,
        columns: columns,
        responsive: true,
        paging: true,
        searching: true,
        ordering: true,
        scrollX: true,
        pagingType: "full_numbers",
        lengthMenu: [10, 25, 50, 75, 100, 1000],
        columnDefs: [{ width: "1%", targets: "_all" }],
        createdRow: function (row, data, dataIndex) {
          if (!data.checked_by) {
            $(row).addClass("bg-red-200"); // Row in red if not checked
          } else {
            $(row).addClass("bg-green-200"); // Row in green if checked
          }
        },
      });
  
      // Check button click handler
      $(tableElement).on("click", ".btn-chequeo", function () {
        const rowData = $(tableElement).DataTable().row($(this).closest("tr")).data(); // Get row data
        handleCheckClick(rowData);
      });
  
      // Auditor button click handler
      $(tableElement).on("click", ".btn-auditor", function () {
        const rowData = $(tableElement).DataTable().row($(this).closest("tr")).data(); // Get row data
        handleViewClick(rowData);
      });
    }
  }, [inspection, roleUser]);
  
  return (
    <div className="flex flex-col md:flex-row mt-8">
      <Sidebar />
      <div className="flex-1 md:ml-72 ml-4 text-sm md:mr-5 mr-4 overflow-x-auto">
        <Navbar Title={"Lista de Inspecciones"} />
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={NewInspection}
            className="bg-green-500 hover:bg-gray-800 text-white focus:ring-2 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full md:w-auto"
          >
            Nueva Inspección
          </button>
  
          {/* Botones de exportación */}
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
  
        <div className="bg-white shadow-md rounded-lg overflow-x-auto mt-4">
          <table
            ref={tableRef}
            className="display w-full table-auto border-collapse"
          >
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-2 py-1">ID Inspección</th>
                <th className="px-2 py-1">Vehículo</th>
                <th className="px-2 py-1">Tipo de Vehículo</th>
                <th className="px-2 py-1">Kilometraje</th>
                <th className="px-2 py-1">Conductor</th>
                <th className="px-2 py-1">Fecha</th>
                {(roleUser === 'ADMIN' || roleUser === 'AUDITOR') && (
                  <th className="px-2 py-1">Chequeado</th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white text-gray-600 font-medium"></tbody>
          </table>
        </div>
  
        {/* Modal para chequear */}
        {selectedInspection && (
          <ModalChequeo
            isOpen={openModal}
            isViewOnly={isViewOnly}
            onRequestClose={closeModal}
            row={selectedInspection}
            center
          >
            <button onClick={closeModal} className="btn btn-primary mt-4">
              Cerrar
            </button>
          </ModalChequeo>
        )}
      </div>
    </div>
  );
  
};

export default DatatableInspection;
