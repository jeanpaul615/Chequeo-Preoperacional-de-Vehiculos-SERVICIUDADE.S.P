import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import Sidebar from "../../../containers/Sidebar";
import Navbar from "../../../containers/Navbar";
import { GetInspectionByDriver } from "../../../controllers/Inspection/InspectionControllers/GetInspectionByDriver";


const formatDate = (dateString) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const DatatableInspectionByDriver = () => {
  const tableRef = useRef(null);
  const [inspection, setInspection] = useState([]);

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
          { title: "Kilometraje", data: "mileage" },
          { title: "Conductor", data: "driver_name" },
          {
            title: "Fecha Creación",
            data: "created_at",
            render: (data) => formatDate(data),
          } 
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

  return (
    <div className="flex flex-col md:flex-row mt-8">
      <Sidebar />
      <div className="flex-1 md:ml-72 ml-4 text-sm md:mr-5 mr-5 overflow-x-auto">
        <Navbar Title={"Inspecciones por Conductor"} />
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table
            ref={tableRef}
            className="display w-full table-auto border-collapse"
          >
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-2 py-1">ID Inspección</th>
                <th className="px-2 py-1">Vehículo</th>
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
