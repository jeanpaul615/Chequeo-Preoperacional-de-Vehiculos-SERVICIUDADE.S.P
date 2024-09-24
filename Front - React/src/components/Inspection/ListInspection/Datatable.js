import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import Sidebar from "../../../containers/Sidebar";
import Navbar from "../../../containers/Navbar";
import { GetInspection } from "../../../controllers/Inspection/InspectionControllers/GetInspection";
import ModalChequeo from "./ModalChequeo"; // Puedes usar cualquier librería de modales

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const DatatableInspection = () => {
  const tableRef = useRef(null);
  const [inspection, setInspection] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedInspection, setSelectedInspection] = useState(null); // Almacenar la inspección seleccionada

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

  // Cerrar modal
  const closeModal = () => {
    setOpenModal(false);
    setSelectedInspection(null);
  };

  useEffect(() => {
    if (inspection.length > 0) {
      const tableElement = tableRef.current;

      if ($.fn.DataTable.isDataTable(tableElement)) {
        $(tableElement).DataTable().destroy();
      }

      $(tableElement).DataTable({
        data: inspection,
        columns: [
          { title: "ID Inspección", data: "inspection_id" },
          { title: "Kilometraje", data: "mileage" },
          { title: "Vehículo", data: "license_plate" },
          { title: "Conductor", data: "driver_name" },
          {
            title: "Fecha Creación",
            data: "created_at",
            render: (data) => formatDate(data),
          },
          {
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
                return `${data}`; // Mostrar chequeador si existe
              }
            },
          },
        ],
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
            $(row).addClass("bg-red-200"); // Fila en rojo si no está chequeado
          } else {
            $(row).addClass("bg-green-200"); // Fila en verde si está chequeado
          }
        },
      });

      // Manejador de clic en el botón de chequeo
      $(tableElement).on("click", ".btn-chequeo", function () {
        const row = $(this).closest("tr").data(); // Obtener los datos de la fila
        handleCheckClick(row);
      });
    }
  }, [inspection]);

  return (
    <div className="flex flex-col md:flex-row mt-8">
      <Sidebar />
      <div className="flex-1 md:ml-72 ml-4 text-sm md:mr-5 mr-5 overflow-x-auto">
        <Navbar Title={"Lista de Inspecciones"} />

        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table
            ref={tableRef}
            className="display w-full table-auto border-collapse"
          >
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-2 py-1">ID Inspección</th>
                <th className="px-2 py-1">Kilometraje</th>
                <th className="px-2 py-1">Vehículo</th>
                <th className="px-2 py-1">Conductor</th>
                <th className="px-2 py-1">Fecha</th>
                <th className="px-2 py-1 ml-12">Chequeado</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-600 font-medium"></tbody>
          </table>
        </div>

        {/* Modal para Chequear */}
        {selectedInspection && (
          <ModalChequeo isOpen={openModal} onRequestClose={closeModal} center>
            <h2>Chequear Inspección</h2>
            <p>ID Inspección: {selectedInspection.inspection_id}</p>
            <p>Vehículo: {selectedInspection.license_plate}</p>
            <p>Conductor: {selectedInspection.driver_name}</p>
            {/* Aquí puedes añadir más campos para chequear */}
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
