import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import Sidebar from "../../../containers/Sidebar";
import Navbar from "../../../containers/Navbar";
import { GetInspectionByDriver } from "../../../controllers/Inspection/InspectionControllers/GetInspectionByDriver";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import RoleVerify from "../../../containers/RoleVerify";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const DatatableInspectionByDriver = () => {
  const tableRef = useRef(null);
  const [inspection, setInspection] = useState([]);
  const roleUser = RoleVerify();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetInspectionByDriver();
        setInspection(result || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (inspection.length > 0) {
      const tableElement = tableRef.current;

      if ($.fn.DataTable.isDataTable(tableElement)) {
        $(tableElement).DataTable().destroy();
      }

      $(tableElement).DataTable({
        data: inspection,
        columns: [
          { title: "Id", data: "inspection_id" },
          { title: "Vehículo", data: "license_plate" },
          { title: "Tipo de Vehículo", data: "type" },
          { title: "Kilometraje", data: "mileage" },
          { title: "Conductor", data: "driver_name" },
          {
            title: "Fecha Creación",
            data: "created_at",
            render: (data) => formatDate(data),
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
      });
    }
  }, [inspection]);

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

    inspection.forEach((item, index) => {
      const text = `${index + 1}. ID: ${item.inspection_id}, Vehículo: ${item.license_plate}, Tipo: ${item.type}, Kilometraje: ${item.mileage}, Conductor: ${item.driver_name}, Fecha: ${formatDate(item.created_at)}`;
      if (yPosition > pageHeight - marginBottom) {
        doc.addPage();
        yPosition = 20;
      }
      const splitText = doc.splitTextToSize(text, 180);
      doc.text(splitText, 20, yPosition);
      yPosition += lineHeight;
    });
    doc.save("inspecciones.pdf");
  };

  const exportToExcel = () => {
    const inspectionInSpanish = inspection.map((item) => ({
      "ID Inspección": item.inspection_id,
      "Vehículo": item.license_plate,
      "Tipo": item.type,
      "Kilometraje": item.mileage,
      "Conductor": item.driver_name,
      "Fecha Creación": formatDate(item.created_at),
    }));
    const worksheet = XLSX.utils.json_to_sheet(inspectionInSpanish);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inspecciones");
    XLSX.writeFile(workbook, "inspection.xlsx");
  };

  return (
    <div className="flex flex-col md:flex-row mt-8">
      <Sidebar />
      <div className="flex-1 md:ml-72 ml-4 text-sm md:mr-5 mr-5 overflow-x-auto">
        <Navbar Title={"Inspecciones por Conductor"} />
        <div className="bg-white shadow-md rounded-lg overflow-x-auto p-4">
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
              </tr>
            </thead>
            <tbody className="bg-white text-gray-600 font-medium"></tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DatatableInspectionByDriver;
