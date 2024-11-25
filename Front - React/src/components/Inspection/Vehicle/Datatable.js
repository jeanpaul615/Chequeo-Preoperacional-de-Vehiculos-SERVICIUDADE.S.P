import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import Sidebar from "../../../containers/Sidebar";
import Navbar from "../../../containers/Navbar";
import Swal from "sweetalert2";
import { GetVehicles } from "../../../controllers/Inspection/DashboardControllers/Vehicle";
import { DeleteVehicle } from "../../../controllers/Inspection/VehicleControllers/DeleteVehicle";
import ModalNewVehicle from "./ModalNewVehicle";
import ModalUpdate from "./ModalUpdate"; 
import jsPDF from "jspdf";
import * as XLSX from "xlsx"; 
import RoleVerify from "../../../containers/RoleVerify";
import ModalCalendar from "./ModalCalendar";
// Función para formatear la fecha
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const DatatableVehicles = () => {
  const tableRef = useRef(null);
  const [data, setData] = useState([]);
  const [modalUpdateIsOpen, setModalUpdateIsOpen] = useState(false);
  const [modalCalendarIsOpen, setModalCalendarIsOpen] = useState(false);

  const [modalNewVehicleIsOpen, setModalNewVehicleIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const roleUser = RoleVerify();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetVehicles();
        const formattedData = result.map((item) => ({
          ...item,
          // No formatear las fechas aquí para que estén en formato original
          soat_until: item.soat_until,
          rtm_until: item.rtm_until,
          created_at: item.created_at,
          updated_at: item.updated_at,
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      // Verificar si hay datos antes de inicializar la tabla
      const tableElement = tableRef.current;

      const dataTable = $(tableElement).DataTable({
        data: data,
        columns: [
          { title: "ID vehiculo", data: "vehicle_id" },
          { title: "Tipo", data: "type" },
          { title: "Placa", data: "license_plate" },
          { title: "Marca", data: "brand" },
          { title: "Area", data: "area" },
          {
            title: "Vigencia Soat",
            data: "soat_until",
            render: (data) => formatDate(data),
          },
          {
            title: "Vigencia RTM",
            data: "rtm_until",
            render: (data) => formatDate(data),
          },
          {
            title: "Fecha Creación",
            data: "created_at",
            render: (data) => formatDate(data),
          },
          {
            title: "Fecha Actualización",
            data: "updated_at",
            render: (data) => formatDate(data),
          },
          {
            title: "Opciones",
            data: null,
            render: function (data, type, row) {
              return `
                <button type="button" class="btn-update  hover:text-white bg-gray-100 hover:bg-blue-600 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-full text-sm px-2 py-1 text-center inline-flex items-center me-2 mb-2">
                  Actualizar
                </button>
                <button type="button" class="btn-delete  hover:text-white bg-gray-100 hover:bg-red-600 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-full text-sm px-2 py-1 text-center inline-flex items-center me-2 mb-2">
                  Eliminar
                </button>
                <button type="button" class="btn-calendar  hover:text-white bg-gray-100 hover:bg-green-600 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-full text-sm px-2 py-1 text-center inline-flex items-center me-2 mb-2">
                  Calendario
                </button>
              `;
            },
          },
        ],
        responsive: true,
        destroy: true,
        paging: true,
        searching: true,
        ordering: true,
        scrollX: true,
        pagingType: "full_numbers", // Use full_numbers pagination style
        lengthMenu: [10, 25, 50, 75, 100, 1000], // Options for rows per page
        columnDefs: [
          { width: "1%", targets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
        ],
      });

      // Handle button clicks
      $(tableElement).on("click", "button", function () {
        const button = $(this);
        const rowData = dataTable.row(button.closest("tr")).data();

        if (rowData) {
          if (button.hasClass("btn-update")) {
            handleEditClick(rowData);
          } else if(button.hasClass("btn-calendar")){
            handleCalendarClick(rowData);
            } else if (button.hasClass("btn-delete")) {
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
                DeleteVehicle(rowData.vehicle_id)
                  .then((response) => {
                    if (response) {
                      setData((prevData) =>
                        prevData.filter(
                          (item) => item.vehicle_id !== rowData.vehicle_id
                        )
                      );
                    }
                  })
                  .catch((error) =>
                    console.error("Error deleting vehicle:", error)
                  );
              }
            });
          }
        }
      });

      return () => {
        if ($.fn.DataTable.isDataTable(tableElement)) {
          $(tableElement).DataTable().destroy();
        }
      };
    }
    // eslint-disable-next-line
  }, [data]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev); // Toggle dropdown visibility
  };

  const openUpdateModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    setModalUpdateIsOpen(true);
  };

  const closeUpdateModal = () => {
    setModalUpdateIsOpen(false);
  };

  const openNewVehicleModal = () => {
    setModalNewVehicleIsOpen(true);
  };

  const closeNewVehicleModal = () => {
    setModalNewVehicleIsOpen(false);
  };

  const closeCalendarModal = () => {
    setModalCalendarIsOpen(false);
  };

  const handleEditClick = (vehicle) => {
    openUpdateModal(vehicle);
  };

  const handleCalendarClick = (vehicle) => {
    setSelectedVehicle(vehicle);
    setModalCalendarIsOpen(true);
  }

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(10); // Reducir el tamaño de la letra
    
    // Título
    doc.text("Lista de Inspecciones", 20, 20);
    
    // Variables para la posición inicial y el margen inferior
    let yPosition = 30;
    const lineHeight = 10; // Altura de cada línea
    const pageHeight = doc.internal.pageSize.height;
    const marginBottom = 20;
  
    // Recorrer los datos
    data.forEach((item, index) => {
      const text = `${index + 1}. ID: ${item.vehicle_id}, Vehículo: ${item.license_plate}, Marca: ${item.brand}, Tipo: ${item.type}, Area: ${item.area}, Soat: ${item.soat_until}, RTM: ${item.rtm_until}, Fecha: ${formatDate(item.created_at)}`;
      
      // Comprobar si es necesario crear una nueva página
      if (yPosition > pageHeight - marginBottom) {
        doc.addPage(); // Añadir una nueva página
        yPosition = 20; // Reiniciar la posición de la línea en la nueva página
      }
      
      // Dividir el texto si es demasiado largo para una sola línea
      const splitText = doc.splitTextToSize(text, 180); // Ajustar el ancho del texto a 180
      doc.text(splitText, 20, yPosition);
      
      yPosition += lineHeight; // Aumentar la posición vertical para la próxima línea
    });
  
    // Guardar el archivo PDF
    doc.save("vehiculos.pdf");
  };
  

  const exportToExcel = () => {
    // Crear una copia del array de inspecciones con nombres de columnas en español
    const inspectionInSpanish = data.map((item) => ({
      "ID Inspección": item.vehicle_id,
      "Vehículo": item.license_plate,
      "Tipo": item.type,
      "Marca": item.brand,
      "RTM vigencia": item.rtm_until,
      "Soat vigencia": item.soat_until,
      "Fecha Creación": formatDate(item.created_at),
    }));
  
    // Crear la hoja de cálculo con los nuevos nombres de columnas
    const worksheet = XLSX.utils.json_to_sheet(inspectionInSpanish);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inspecciones");
    
    // Descargar el archivo Excel con nombre en español
    XLSX.writeFile(workbook, "vehiculos.xlsx");
  };
  


  return (
    <div className="ml-5 flex flex-col md:flex-row mt-8">
      <Sidebar />
      <div className="flex-1 md:ml-64 ml-4 text-sm md:mr-5 mr-2 overflow-x-auto">
        <Navbar Title={"Vehículos"} />
  
        {/* Botón para agregar vehículo */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={openNewVehicleModal}
            className="bg-green-500 hover:bg-green-600 text-white focus:ring-2 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
          >
            Nuevo Vehículo
          </button>
          {/* Export Buttons */}
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
  
        {/* Tabla de vehículos */}
        <div className=" bg-white shadow-md rounded-lg mt-4 overflow-x-auto">
          <table
            ref={tableRef}
            className="display w-full table-auto border-collapse"
          >
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-2 py-1">Id Vehículo</th>
                <th className="px-2 py-1">Tipo</th>
                <th className="px-2 py-1">Placa</th>
                <th className="px-2 py-1">Marca</th>
                <th className="px-2 py-1">Área</th>
                <th className="px-2 py-1">Vigencia Soat</th>
                <th className="px-2 py-1">Vigencia RTM</th>
                <th className="px-2 py-1">Fecha Creación</th>
                <th className="px-2 py-1">Fecha Actualización</th>
                <th className="px-2 py-1">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-600 font-medium"></tbody>
          </table>
        </div>
  
        {/* Modales */}
        {modalUpdateIsOpen && (
          <ModalUpdate
            isOpen={modalUpdateIsOpen}
            onClose={closeUpdateModal}
            vehicle={selectedVehicle}
          />
        )}
        {modalNewVehicleIsOpen && (
          <ModalNewVehicle
            isOpen={modalNewVehicleIsOpen}
            onClose={closeNewVehicleModal}
          />
        )}
        {modalCalendarIsOpen && (
          <ModalCalendar
            isOpen={modalCalendarIsOpen}
            onClose={closeCalendarModal}
          />
        )}
      </div>
    </div>
  );  
}
export default DatatableVehicles;
