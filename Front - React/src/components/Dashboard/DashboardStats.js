// DashboardStats.js
import React from "react";

const DashboardStats = ({
  driversCount,
  vehiclesCount,
  vehicleTypes,
  vehicleDependencies,
}) => {
  return (
    <div>
    <div className="grid grid-cols-4 gap-4 mb-4">
      <div className="flex items-center justify-center h-24 text-center rounded bg-gray-50 dark:bg-gray-800">
        <p className="text-2xl text-gray-400 dark:text-gray-500">
          Conductores registrados: {driversCount}
        </p>
      </div>
      <div className="flex items-center text-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
        <p className="text-2xl text-gray-400 dark:text-gray-500">
          Vehículos registrados: {vehiclesCount}
        </p>
      </div>
      <div className="flex items-center text-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
        <p className="text-2xl text-gray-400 dark:text-gray-500">
          Tipos de Vehículos: {vehicleTypes.join(", ")}
        </p>
      </div>
      <div className="flex items-center text-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
        <p className="text-2xl text-gray-400 dark:text-gray-500">
          Dependencias: {vehicleDependencies.join(", ")}
        </p>
      </div>
      </div>
      <div className="w-full">
        <div className="flex items-center text-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
          <p className="text-2xl text-gray-400 dark:text-gray-500">
            Chequeos Mensuales
          </p>
        </div>
      </div>
      </div>

  );
};

export default DashboardStats;
