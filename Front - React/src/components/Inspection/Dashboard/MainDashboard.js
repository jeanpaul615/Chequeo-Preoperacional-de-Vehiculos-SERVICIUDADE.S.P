import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "../../../containers/Sidebar";
import DashboardStats from "./DashboardStats";
import Navbar from "../../../containers/Navbar"; // Ajusta la ruta según tu estructura de carpetas

const MainDashboard = () => {
  const [driversCount, setDriversCount] = useState(0);
  const [vehiclesCount, setVehiclesCount] = useState(0);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [vehicleDependencies, setVehicleDependencies] = useState([]);
  const [numberInspection, setNumberInspection] = useState(0);
  const [inspectionsToday, setInspectionsToday] = useState(0);
  const [inspectionsThisMonth, setInspectionsThisMonth] = useState(0);
  const [monthlyInspectionData, setMonthlyInspectionData] = useState([]);
  const [yearlyInspectionData, setYearlyInspectionData] = useState([]);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchInspectionData = async () => {
      try {
        if (!token) {
          Swal.fire("Error", "No se ha encontrado el token de acceso.", "error");
          return;
        }
        const response = await axios.get(
          "http://localhost:8000/api/v1/inspection",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const currentYear = new Date().getFullYear();

        // Agrupar datos por mes del año actual
        const monthlyGroupedData = response.data.reduce((acc, inspection) => {
          const date = new Date(inspection.created_at);
          const year = date.getFullYear();
          const month = date.toLocaleString("default", { month: "short" });
          if (year === currentYear) {
            acc[month] = (acc[month] || 0) + 1;
          }
          return acc;
        }, {});

        const formattedMonthlyData = Object.keys(monthlyGroupedData).map((month) => ({
          label: month,
          value: monthlyGroupedData[month],
        }));

        // Agrupar datos por año
        const yearlyGroupedData = response.data.reduce((acc, inspection) => {
          const date = new Date(inspection.created_at);
          const year = date.getFullYear();
          acc[year] = (acc[year] || 0) + 1;
          return acc;
        }, {});

        const formattedYearlyData = Object.keys(yearlyGroupedData).map((year) => ({
          year: year,
          value: yearlyGroupedData[year],
        }));

        setMonthlyInspectionData(formattedMonthlyData);
        setYearlyInspectionData(formattedYearlyData);
      } catch (error) {
        Swal.fire("Error al obtener los datos de inspección:", error.message);
      }
    };

    const fetchData = async () => {
      try {
        const driversResponse = await axios.get("http://localhost:8000/api/v1/drivers", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setDriversCount(driversResponse.data.length);

        const vehiclesResponse = await axios.get("http://localhost:8000/api/v1/vehicles", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setVehiclesCount(vehiclesResponse.data.length);

        const inspectionResponse = await axios.get("http://localhost:8000/api/v1/inspection", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setNumberInspection(inspectionResponse.data.length);

        // Filtrar las inspecciones del día de hoy y del mes actual
        const today = new Date().toISOString().slice(0, 10);
        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().slice(0, 10);
        const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().slice(0, 10);

        const todayCount = inspectionResponse.data.filter(inspection => inspection.created_at.startsWith(today)).length;
        const monthCount = inspectionResponse.data.filter(inspection => inspection.created_at >= startOfMonth && inspection.created_at <= endOfMonth).length;

        setInspectionsToday(todayCount);
        setInspectionsThisMonth(monthCount);

        const types = [...new Set(vehiclesResponse.data.map(vehicle => vehicle.type))];
        const dependencies = [...new Set(vehiclesResponse.data.map(vehicle => vehicle.area))];

        setVehicleTypes(types);
        setVehicleDependencies(dependencies);

      } catch (error) {
        Swal.fire("Error al obtener los datos:", error.message);
      }
    };

    fetchInspectionData();
    fetchData();
    // eslint-disable-next-line
  }, [token]);

  return (
    <div>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <Navbar Title={"Dashboard"} />
        <div className="p-4 border-2 border-gray-200 border-dashed text-center rounded-lg dark:border-gray-700">
          <DashboardStats
            driversCount={driversCount}
            vehiclesCount={vehiclesCount}
            vehicleTypes={vehicleTypes}
            vehicleDependencies={vehicleDependencies}
            inspectionData={monthlyInspectionData}
            numberInspection={numberInspection}
            inspectionsToday={inspectionsToday}
            inspectionsThisMonth={inspectionsThisMonth}
            yearlyInspectionData={yearlyInspectionData}
          />
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
