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

const DatatableDrivers = () => {
  const tableRef = useRef(null);
  const [data, setData] = useState([]);
  const [modalUpdateIsOpen, setModalUpdateIsOpen] = useState(false);
  const [modalNewDriverIsOpen, setModalNewDriverIsOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null); // Stores the selected driver object

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
      lengthMenu: [1000, 100, 75, 50, 25, 10], // Options for rows per page
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
