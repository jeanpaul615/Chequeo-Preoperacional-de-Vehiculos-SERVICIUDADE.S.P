import React from "react";
import BarChart from "./Graphics/BarChart";
import BarChartYear from "./Graphics/BarChartYear";
import FetchPieChart from "./Graphics/fetchPieChart";
import FetchPieChartUser from "./Graphics/fetchPieChartUser";

const DashboardStats = ({
  driversCount,
  vehiclesCount,
  vehicleTypes,
  vehicleDependencies,
  inspectionData,
  numberInspection,
  inspectionsToday,
  inspectionsThisMonth,
  yearlyInspectionData
}) => {
  return (
    <div className="p-6 space-y-6">
      {/* ITEMS FILA 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center justify-center p-4 text-center rounded-lg bg-blue-100 dark:bg-blue-900 shadow-md border border-blue-200 dark:border-blue-700 h-24">
          <p className="text-base font-semibold text-blue-800 dark:text-blue-200">
            Conductores registrados: {driversCount}
          </p>
        </div>
        <div className="flex items-center justify-center p-4 text-center rounded-lg bg-green-100 dark:bg-green-900 shadow-md border border-green-200 dark:border-green-700 h-24">
          <p className="text-base font-semibold text-green-800 dark:text-green-200">
            Vehículos registrados: {vehiclesCount}
          </p>
        </div>
        <div className="flex items-center justify-center p-4 text-center rounded-lg bg-yellow-100 dark:bg-yellow-900 shadow-md border border-yellow-200 dark:border-yellow-700 h-24">
          <p className="text-base font-semibold text-yellow-800 dark:text-yellow-200">
            Tipos de Vehículos: {vehicleTypes.join(", ")}
          </p>
        </div>
        <div className="flex items-center justify-center p-4 text-center rounded-lg bg-red-100 dark:bg-red-900 shadow-md border border-red-200 dark:border-red-700 h-24">
          <p className="text-base font-semibold text-red-800 dark:text-red-200">
            Dependencias: {vehicleDependencies.join(", ")}
          </p>
        </div>
      </div>

      {/* ITEM FILA 2 */}
      <div className="w-full bg-gray-100 rounded-lg shadow-md border border-gray-200 dark:border-gray-100 p-2">
        <BarChart data={inspectionData} />
      </div>

      {/* ITEMS FILA 3 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="flex items-center justify-center p-4 text-center rounded-lg bg-purple-100 dark:bg-purple-900 shadow-md border border-purple-200 dark:border-purple-700 h-24">
          <p className="text-base font-semibold text-purple-800 dark:text-purple-200">
            Total Inspecciones: {numberInspection}
          </p>
        </div>
        <div className="flex items-center justify-center p-4 text-center rounded-lg bg-teal-100 dark:bg-teal-900 shadow-md border border-teal-200 dark:border-teal-700 h-24">
          <p className="text-base font-semibold text-teal-800 dark:text-teal-200">
            Inspecciones hoy: {inspectionsToday}
          </p>
        </div>
        <div className="flex items-center justify-center p-4 text-center rounded-lg bg-indigo-100 dark:bg-indigo-900 shadow-md border border-indigo-200 dark:border-indigo-700 h-24">
          <p className="text-base font-semibold text-indigo-800 dark:text-indigo-200">
            Inspecciones este mes: {inspectionsThisMonth}
          </p>
        </div>
      </div>

      {/* ITEMS FILA 4 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex-col items-center justify-center p-1 text-center rounded-lg bg-white dark:bg-gray-300 shadow-md border border-gray-200 dark:border-gray-400">
          <p className="text-orange-700 font-medium">Distribución Vehículos</p>
          <FetchPieChart />
        </div>
        <div className="h-48 w-full p-2 text-center rounded-2xl shadow-2xl border border-white col-span-2">
          <BarChartYear data={yearlyInspectionData} />
        </div>
        <div className="flex-col items-center justify-center p-1 text-center rounded-lg bg-white dark:bg-gray-300 shadow-md border border-gray-200 dark:border-gray-400">
          <p className="text-blue-600 font-medium">Distribución Usuarios</p>
          <FetchPieChartUser />
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
