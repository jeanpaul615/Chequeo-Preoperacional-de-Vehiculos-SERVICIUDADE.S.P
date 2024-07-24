// MainDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "../../containers/Sidebar";
import DashboardStats from "./DashboardStats";

const MainDashboard = () => {
  const [driversCount, setDriversCount] = useState(0);
  const [vehiclesCount, setVehiclesCount] = useState(0);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [vehicleDependencies, setVehicleDependencies] = useState([]);
  const token = localStorage.getItem("access_token");

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

      const types = [...new Set(vehiclesResponse.data.map(vehicle => vehicle.type))];
      const dependencies = [...new Set(vehiclesResponse.data.map(vehicle => vehicle.area))];

      setVehicleTypes(types);
      setVehicleDependencies(dependencies);
    } catch (error) {
      Swal.fire("Error al obtener los datos:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed text-center rounded-lg dark:border-gray-700">
          <DashboardStats
            driversCount={driversCount}
            vehiclesCount={vehiclesCount}
            vehicleTypes={vehicleTypes}
            vehicleDependencies={vehicleDependencies}
          />
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
