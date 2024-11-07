import React, { useEffect, useState, useRef } from "react";
import $ from "jquery";
import "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import Sidebar from "../../../../containers/Sidebar";
import { GetMaintenance } from "../../../../controllers/Inspection/MaintenanceControllers/GetMaintenance";
import Navbar from "../../../../containers/Navbar";
import SolutionModal from "./SolutionModal";
import { motion } from "framer-motion";


const formatDate = (dateString) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const DatatableListMaintenance = () => {
  const tableRef = useRef(null);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [showModalVehiculo, setShowModalVehiculo] = useState(false);
  const [selectedMaintenance, setSelectedMaintenance] = useState(null);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showPendingOnly, setShowPendingOnly] = useState(false); // Nuevo estado para el checkbox

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

  useEffect(() => {
    filterData();
    // eslint-disable-next-line
  }, [data, showPendingOnly]); // Filtrar los datos cada vez que cambie `data` o `showPendingOnly`

  const filterData = () => {
    let filtered = [...data];

    if (showPendingOnly) {
      filtered = filtered.filter((row) => !row.solution || row.solution === "");
    }

    if (selectedVehicle) {
      filtered = filtered.filter((row) =>
        row.license_plate.toLowerCase().includes(selectedVehicle.toLowerCase())
      );
    }

    setFilteredData(filtered);
  };

  const filterByVehicle = () => {
    const filtered = data.filter((row) =>
      row.license_plate.toLowerCase().includes(selectedVehicle.toLowerCase())
    );
    setFilteredData(filtered);
    setShowModalVehiculo(false);
  };

  const handleSolutionClick = (maintenance) => {
    setSelectedMaintenance(maintenance);
    setShowModalEdit(true);
  };

  useEffect(() => {
    const tableElement = tableRef.current;
    if (tableElement && filteredData.length > 0) {
      // eslint-disable-next-line
      const table = $(tableElement).DataTable({
        data: filteredData,
        columns: [
          { title: "Id Mantenimiento", data: "id_maintenance" },
          { title: "Vehículo", data: "license_plate" },
          { title: "Id Inspección", data: "inspection_id" },
          { title: "Conductor", data: "driver_name" },
          { title: "Condiciones", data: "conditions" },
          { title: "Comentario", data: "comment" },
          {
            title: "Solución",
            data: "solution",
            render: (data) => {
              return data
                ? `<div class="flex items-center justify-center">
                  <button class="flex items-center justify-center bg-gray-500 text-white py-2 px-4 rounded" title="Auditor">
                    <h1 class="text-xs font-semibold">${data}</h1>
                  </button>
                </div>`
                : `<div class="btn-solution flex items-center justify-center">
                  <button class="flex items-center justify-center space-x-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-orange-600">
                    <h1 class="text-xs font-semibold">Solución</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" viewBox="0 0 512 512" fill="currentColor">
                      <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/>
                    </svg>
                  </button>
                </div>`;
            },
          },
          {title: "Fecha de Creación", data: "created_at", render: (data) => formatDate(data)}
        ],
        createdRow: (row, data) => {
          if (!data.solution || data.solution === "") {
            $(row).addClass("bg-red-600"); // Cambia el color de fondo si la solución está pendiente
          }
        },
        responsive: true,
        destroy: true,
        scrollX: true,
        pagingType: "full_numbers",
        lengthMenu: [10, 25, 50, 75, 100],
        columnDefs: [
          { width: "5%", targets: 0 },
          { width: "15%", targets: 1 },
          { width: "15%", targets: 2 },
          { width: "15%", targets: 3 },
          { width: "10%", targets: 4 },
          { width: "20%", targets: 5 },
          { width: "15%", targets: 6 },
          { width: "15%", targets: 7 },

        ],
      });

      $(tableElement).on("click", ".btn-solution", function () {
        const rowData = $(tableElement)
          .DataTable()
          .row($(this).closest("tr"))
          .data();
        handleSolutionClick(rowData);
      });

      return () => {
        if ($.fn.DataTable.isDataTable(tableElement)) {
          $(tableElement).DataTable().destroy();
        }
      };
    }
  }, [filteredData]);

  return (
    <div className="flex flex-col md:flex-row mt-8">
      <Sidebar />
      <div className="flex-1 md:ml-72 ml-4 text-sm md:mr-5 mr-5 overflow-x-auto">
        <Navbar Title={"Mantenimientos Pendientes del Chequeo Preoperacional"} />

        <div className="flex justify-between items-center mb-4">
          {/* Botón para seleccionar vehículo */}
          <button
            className="bg-green-500 hover:bg-green-700 text-white focus:ring-2 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
            onClick={() => setShowModalVehiculo(true)}
          >
            Seleccionar Vehículo
          </button>

          <label className="flex items-center cursor-pointer ml-4">

            <input
              type="checkbox"
              checked={showPendingOnly}
              onChange={(e) => setShowPendingOnly(e.target.checked)}
              className="hidden"
            />
            <div
              className={`<input id="link-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                ${showPendingOnly
                  ? "bg-white"
                  : ""
                }`}
            >
              <svg
                className={`w-4 h-4 text-white transform transition-transform duration-300 ease-in-out
                ${showPendingOnly ? "scale-100" : "scale-0"}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <span className="ml-2 text-sm font-medium text-black">
              Mostrar solo pendientes
            </span>
          </label>
        </div>

        <table ref={tableRef} className="display" style={{ width: "100%" }} />
        {showModalVehiculo && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="rounded-xl w-11/12 md:w-1/3"
              initial={{ y: "-50vh" }}
              animate={{ y: "0" }}
              exit={{ y: "50vh" }}
            >
              <div className="flex justify-center items-center z-50">
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

            </motion.div>
          </motion.div>
        )}

        {showModalEdit && (
          <SolutionModal
            maintenance={selectedMaintenance}
            setSelectedMaintenance={setSelectedMaintenance}
            onClose={() => setShowModalEdit(false)}
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
                <th className="px-2 py-1">Id Inspección</th>
                <th className="px-2 py-1">Conductor</th>
                <th className="px-2 py-1">Condición</th>
                <th className="px-2 py-1">Comentario</th>
                <th className="px-2 py-1">Solución</th>
                <th className="px-2 py-1">Fecha de Creación</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-600 font-medium">
              {/* Data will be populated here */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DatatableListMaintenance;
