import React, { useEffect, useState, useRef } from "react";
import $ from "jquery";
import "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import Sidebar from "../../../containers/Sidebar";
import { GetUsers } from "../../../controllers/Inspection/DriversControllers/GetDriver";
import Navbar from "../../../containers/Navbar";
import ModalNewDriver from "./ModalNewDriver";
import ModalUpdate from "./ModalUpdate"; 
import moment from "moment";
import Swal from "sweetalert2";
import { DeleteDriver } from "../../../controllers/Inspection/DriversControllers/DeleteDriver";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import RoleVerify from "../../../containers/RoleVerify";


const DatatableDrivers = () => {
  const tableRef = useRef(null);
  const [data, setData] = useState([]);
  const [modalUpdateIsOpen, setModalUpdateIsOpen] = useState(false);
  const [modalNewDriverIsOpen, setModalNewDriverIsOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null); // Stores the selected driver object
  const roleUser = RoleVerify();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetUsers();
        if (result && Array.isArray(result)) {
          setData(result);
        } else {
          setData([]);
          console.error("Data format is not correct");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const tableElement = tableRef.current;

    // Initialize DataTable
    const dataTable = $(tableElement).DataTable({
      data: data.filter(row => row), // Filter out null or undefined data
      columns: [
        { title: "Id Usuario", data: "user_id" },
        { title: "Cédula", data: "user_cedula" },
        { title: "Nombre", data: "driver_name" },
        { title: "Correo Electrónico", data: "user_email" },
        { title: "Rol", data: "user_role" },
        {
          title: "Estado", 
          data: "user_status",
          render: (data) => {
            const statusClass = data === 1 ? "bg-green-500" : "bg-red-500";
            const statusText = data === 1 ? "Activo" : "Inactivo";
            return `
              <div class="flex items-center space-x-2">
                <span class="w-3 h-3 rounded-full ${statusClass}"></span>
                <span class="text-gray-600 font-medium">${statusText}</span>
              </div>
            `;
          }
        },
        {
          title: "Licencia Válida Hasta",
          data: "driver_license_until",
          render: (data) => moment(data).format("DD/MM/YYYY"),
        },
        {
          title: "Opciones",
          data: null,
          render: function (data, type, row) {
            return `
              <button type="button" class="hover:text-white bg-gray-100 hover:bg-blue-600 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-full text-sm px-2 py-1 text-center inline-flex items-center me-2 mb-2" data-id="${row.cedula}">
                Actualizar
              </button>
              <button type="button" class="hover:text-white bg-gray-100 hover:bg-red-600 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-full text-sm px-2 py-1 text-center inline-flex items-center me-2 mb-2" data-id="${row.cedula}">
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
        { width: "20%", targets: 2 }, 
        { width: "25%", targets: 3 }, 
        { width: "15%", targets: 4 }, 
        { width: "10%", targets: 5 }, 
        { width: "10%", targets: 6 },
        { width: "10%", targets: 7 },
      ],
    });

    // Handle button clicks
    $(tableElement).on('click', 'button', function () {
      const button = $(this);
      const buttonText = button.text().trim();
      const rowData = dataTable.row(button.closest('tr')).data();

      if (rowData) {
        if (buttonText === 'Actualizar') {
          handleEditClick(rowData);
        } else if (buttonText === "Eliminar") {
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
              if (rowData) {
                DeleteDriver(rowData).then((response) => {
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
        };
      }
    })

    return () => {
      if ($.fn.DataTable.isDataTable(tableElement)) {
        $(tableElement).DataTable().destroy();
      }
    };
    // eslint-disable-next-line
  }, [data]);

  const openUpdateModal = (driver) => {
    setSelectedDriver(driver); // Set the selected driver data
    setModalUpdateIsOpen(true);
  };

  const closeUpdateModal = () => {
    setModalUpdateIsOpen(false);
  };

  const openNewDriverModal = () => {
    setModalNewDriverIsOpen(true);
  };

  const closeNewDriverModal = () => {
    setModalNewDriverIsOpen(false);
  };

  const handleEditClick = (driver) => {
    openUpdateModal(driver); // Open the update modal with the selected driver
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
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
      const text = `${index + 1}. ID: ${item.user_id}, Cedula: ${item.user_cedula}, Nombre: ${item.driver_name}, Correo: ${item.user_email}, Role: ${item.user_role}, Estado : ${item.user_status}}`;
      if (yPosition > pageHeight - marginBottom) {
        doc.addPage();
        yPosition = 20;
      }
      const splitText = doc.splitTextToSize(text, 180);
      doc.text(splitText, 20, yPosition);
      yPosition += lineHeight;
    });
    doc.save("usuarios.pdf");
  };

  const exportToExcel = () => {
    const inspectionInSpanish = data.map((item) => ({
      "ID Inspección": item.user_id,
      "Cedula": item.user_cedula,
      "Nombre": item.driver_name,
      "Correo": item.user_email,
      "Role": item.user_role,
      "Estado": item.user_status,
    }));
    const worksheet = XLSX.utils.json_to_sheet(inspectionInSpanish);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");
    XLSX.writeFile(workbook, "usuarios.xlsx");
  };

  return (
    <div className="flex flex-col md:flex-row mt-8">
      <Sidebar />
      <div className="flex-1 md:ml-72 ml-4 text-sm md:mr-5 mr-5 overflow-x-auto">
        <Navbar Title={"Conductores"} />
        <button
          onClick={openNewDriverModal}
          className="bg-green-500 hover:bg-gray-800 text-white focus:ring-2 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center w-full md:w-auto"
        >
          Nuevo Conductor
        </button>
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
      {modalUpdateIsOpen && (
        <ModalUpdate
          isOpen={modalUpdateIsOpen}
          onRequestClose={closeUpdateModal}
          driver={selectedDriver} 
        />
      )}
      {modalNewDriverIsOpen && (
        <ModalNewDriver isOpen={modalNewDriverIsOpen} onRequestClose={closeNewDriverModal} />
      )}
    </div>
  );
};

export default DatatableDrivers;
