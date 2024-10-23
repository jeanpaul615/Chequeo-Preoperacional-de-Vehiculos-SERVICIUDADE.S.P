import React, { useEffect, useState, useRef } from "react";
import $ from "jquery";
import "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import Sidebar from "../../../../containers/Sidebar";
import { GetMaintenance } from "../../../../controllers/Inspection/SheetMaintenanceControllers/getMaintenance"
import Navbar from "../../../../containers/Navbar";
import ModalMaintenance from "./ModalMaintenance"; // Import the modal component
import ModalDocumentLoad from './ModalDocumentLoad'; // Asegúrate de que la ruta sea correcta


const DatatableMaintenance = () => {
  const tableRef = useRef(null);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [showModalVehiculo, setShowModalVehiculo] = useState(false); // Modal to select vehicle
  const [showModalEdit, setShowModalEdit] = useState(false); // Modal to edit maintenance
  const [selectedMaintenance, setSelectedMaintenance] = useState(null); // State for selected maintenance
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetMaintenance();
        if (result && Array.isArray(result)) {
          setData(result);
          setFilteredData(result);
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

  const filterByVehicle = () => {
    const filtered = data.filter((row) =>
      row.license_plate.toLowerCase().includes(selectedVehicle.toLowerCase())
    );
    setFilteredData(filtered);
    setShowModalVehiculo(false);
  };

  const handleEditClick = (maintenance) => {
    setSelectedMaintenance(maintenance); // Set selected maintenance for editing
    setShowModalEdit(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Función para cerrar el modal
  };

  useEffect(() => {
    if (!filteredData || filteredData.length === 0) return;

    const tableElement = tableRef.current;
    // eslint-disable-next-line
    const table = $(tableElement).DataTable({
      data: filteredData.filter((row) => row),
      columns: [
        { title: "Id Mantenimiento", data: "id_maintenance" },
        { title: "Vehículo", data: "license_plate" },
        { title: "Creación", data: "created_at" },
        {
          title: "Hoja de Mantenimiento",
          data: null,
          render: function (data, type, row) {
            return `
              <button
                class="pl-12 text-white font-bold py-1 px-3 rounded btn-edit"
                data-license-plate="${row.license_plate}"  // Cambiado a license_plate
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 512 512">
                  <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/>
                </svg>
              </button>
            `;
          },
        },
      ],
      responsive: true,
      destroy: true,
      scrollX: true,
      pagingType: "full_numbers",
      lengthMenu: [10, 25, 50, 75, 100, 1000],
      columnDefs: [
        { width: "10%", targets: 0 },
        { width: "20%", targets: 1 },
        { width: "20%", targets: 2 },
        { width: "10%", targets: 3 },
      ],
    });

    // Add click event for edit buttons
    $(tableElement).on("click", ".btn-edit", function () {
      const licensePlate = $(this).data("license-plate"); // Obtener el valor de license_plate
      const maintenance = filteredData.find(
        (item) => item.license_plate === licensePlate
      );
      if (maintenance) {
        handleEditClick(maintenance); // Pasar el objeto de mantenimiento completo
      }
    });

    return () => {
      if ($.fn.DataTable.isDataTable(tableElement)) {
        $(tableElement).DataTable().destroy();
      }
    };
}, [filteredData]);

  return (
    <div className="flex flex-col md:flex-row mt-8">
      <Sidebar />
      <div className="flex-1 md:ml-72 ml-4 text-sm md:mr-5 mr-5 overflow-x-auto">
        <Navbar Title={"Hoja de Mantenimientos Preventivos"} />
        <button
          className="bg-green-500 hover:bg-gray-800 text-white focus:ring-2 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center w-full md:w-auto"
          onClick={() => setShowModalVehiculo(true)}
        >
          Seleccionar Vehículo
        </button>

        <button
          className="ml-5 justify-center items-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          onClick={() => setIsModalOpen(true)}
        >
          Crear Nueva Hoja de Mantenimiento
        </button>

        {showModalVehiculo && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
              <h2 className="text-lg font-medium mb-4">Seleccionar Vehículo</h2>
              <input
                type="text"
                className="border rounded px-4 py-2 w-full mb-4"
                placeholder="Ingrese Matrícula"
                value={selectedVehicle}
                onChange={(e) => setSelectedVehicle(e.target.value)}
              />
              <div className="flex justify-end space-x-2">
                <button
                  className="bg-gray-300 px-4 py-2 rounded"
                  onClick={() => setShowModalVehiculo(false)}
                >
                  Cancelar
                </button>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
                  onClick={filterByVehicle}
                >
                  Filtrar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Render the modal for maintenance details if selectedMaintenance is set */}
        {showModalEdit && selectedMaintenance && (
          <ModalMaintenance
            maintenance={selectedMaintenance}
            onClose={() => {
              setShowModalEdit(false);
              setSelectedMaintenance(null); // Clear selected maintenance when closing
            }}
          />
        )}

        <div className="bg-white shadow-md rounded-lg overflow-x-auto mt-4">
          <table
            ref={tableRef}
            className="display w-full table-auto border-collapse"
          >
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-2 py-1">Id Mantenimiento</th>
                <th className="px-2 py-1">Vehículo</th>
                <th className="px-2 py-1">Creación</th>
                <th className="px-2 py-1">Hoja de Mantenimiento</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-600 font-medium"></tbody>
          </table>
        </div>
      </div>
            {/* Modal de carga de documentos */}
            {isModalOpen && (
        <ModalDocumentLoad
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default DatatableMaintenance;
