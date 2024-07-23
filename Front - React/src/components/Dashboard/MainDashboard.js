import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "../../containers/Sidebar";

const MainDashboard = () => {
  const [driversCount, setDriversCount] = useState(0);
  const [vehiclesCount, setVehiclesCount] = useState(0);
  /*const [inspectorsCount, setInspectorsCount] = useState(0);
  const [dailyChecksCount, setDailyChecksCount] = useState(0);
  const [monthlyChecksCount, setMonthlyChecksCount] = useState(0);
  const [auditedChecksCount, setAuditedChecksCount] = useState(0);*/

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

      /*const inspectorsResponse = await axios.get("http://localhost:8000/api/v1/inspectors", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setInspectorsCount(inspectorsResponse.data.length);

      const dailyChecksResponse = await axios.get("http://localhost:8000/api/v1/daily-checks", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setDailyChecksCount(dailyChecksResponse.data.length);

      const monthlyChecksResponse = await axios.get("http://localhost:8000/api/v1/monthly-checks", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMonthlyChecksCount(monthlyChecksResponse.data.length);

      const auditedChecksResponse = await axios.get("http://localhost:8000/api/v1/audited-checks", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAuditedChecksCount(auditedChecksResponse.data.length);*/
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
          <div className="grid grid-cols-3 gap-4 mb-4">
            {/*item 1 - Conductores registrados*/}
            <div className="flex items-center justify-center h-24 text-center rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                Conductores registrados: {driversCount}
              </p>
            </div>
            {/*item 2 - Vehiculos registrados*/}
            <div className="flex items-center text-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                Vehículos registrados: {vehiclesCount}
              </p>
            </div>
            {/*item 3 - Tipos de Vehículos y dependencias(Aseo, acueducto, alcantarillado)*/}
            <div className="flex items-center text-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                Tipos de Vehículos y dependencias(Aseo, acueducto,
                alcantarillado)
              </p>
            </div>
          </div>
          {/*item 4 - Diagrama de barras de chequeo realizado cada dia*/}
          <div className="flex items-center text-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              Cantidad de revisadores y auditores registrados: 
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {/*item 5 - Cantidad de chequeos realizados en el día*/}
            <div className="text-center flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                Cantidad de chequeos realizados en el día: 
              </p>
            </div>
            {/*Item 6 - Cantidad de chequeos realizados en el mes*/}
            <div className="text-center flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                Cantidad de chequeos realizados en el mes: 
              </p>
            </div>
            {/* Item 7 - Chequeos revisados y auditados*/}
            <div className="text-center flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                Chequeos revisados y auditados: 
              </p>
            </div>
          </div>
          {/* Item 8 - Diagrama de barras de chequeos realizados cada mes*/}
          <div className="text-center flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              Diagrama de barras de chequeos realizados cada mes
            </p>
          </div>
          <div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {/*item 9 - Diagrama circular de tipos de vehiculos*/}
              <div className="text-center flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">
                  Diagrama circular de tipos de vehiculos
                </p>
              </div>
              {/*Item 10 -Diagrama de barras comparacion de conductores,vehiculos,revisadores y auditores*/}
              <div className="text-center flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">
                  Cantidad de chequeos realizados en el mes
                </p>
              </div>
              {/* Item 11 - Cantidad de revisadores y auditores registrados*/}
              <div className="text-center flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">
                  Cantidad de revisadores y auditores registrados
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
