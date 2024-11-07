import React from "react";
import BarChart from "./Graphics/BarChart";
import BarChartYear from "./Graphics/BarChartYear";
import FetchPieChart from "./Graphics/fetchPieChart";
import FetchPieChartUser from "./Graphics/fetchPieChartUser";
import { UserGroupIcon } from "@heroicons/react/outline";
import { TruckIcon } from "@heroicons/react/outline";
import { CheckCircleIcon } from "@heroicons/react/outline";
import {  HomeIcon } from "@heroicons/react/outline";
import {  ShieldCheckIcon } from "@heroicons/react/outline";
import {  PaperAirplaneIcon } from "@heroicons/react/outline";
import {  ArchiveIcon } from "@heroicons/react/outline";





const DashboardStats = ({
  driversCount,
  vehiclesCount,
  vehicleTypes,
  vehicleDependencies,
  inspectionData,
  numberInspection,
  inspectionsToday,
  inspectionsThisMonth,
  yearlyInspectionData,
}) => {
  return (
<div className="p-6 space-y-6">
  {/* ROW 1: Cuatro tarjetas estadísticas */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {/* Tarjeta de Conductores Registrados */}
    <div className="flex flex-col items-end justify-between p-4 text-right rounded-lg bg-blue-50 shadow-lg border-l-8 border-blue-500 hover:shadow-xl transition-shadow duration-300 ease-in-out h-32 w-full">
      <div className="flex items-center space-x-4">
        <UserGroupIcon className="h-10 w-10 text-blue-600 flex-shrink-0" />
        <p className="text-sm font-medium text-gray-800">Conductores registrados:</p>
      </div>
      <p className="text-3xl font-bold text-blue-700 mb-2">{driversCount}</p>
    </div>

    {/* Tarjeta de Vehículos Registrados */}
    <div className="flex flex-col items-end justify-between p-4 text-right rounded-lg bg-green-50 shadow-lg border-l-8 border-green-500 hover:shadow-xl transition-shadow duration-300 ease-in-out h-32 w-full">
      <div className="flex items-center space-x-4">
        <TruckIcon className="h-12 w-12 text-green-600 flex-shrink-0" />
        <p className="text-sm font-medium text-gray-800 mb-1">Vehículos registrados:</p>
      </div>
      <p className="text-3xl font-bold text-green-700">{vehiclesCount}</p>
    </div>

    {/* Tarjeta de Tipos de Vehículos */}
    <div className="flex flex-col items-end justify-between p-4 text-right rounded-lg bg-orange-50 shadow-lg border-l-8 border-orange-500 hover:shadow-xl transition-shadow duration-300 ease-in-out h-32 w-full">
      <div className="flex items-center space-x-4">
        <CheckCircleIcon className="h-12 w-12 text-orange-600 flex-shrink-0" />
        <p className="text-sm font-medium text-gray-800 mb-1">Tipos de Vehículos:</p>
      </div>
      <p className="text-xs font-semibold text-gray-700">{vehicleTypes.join(", ")}</p>
    </div>

    {/* Tarjeta de Dependencias */}
    <div className="flex flex-col items-end justify-between p-4 text-right rounded-lg bg-purple-50 shadow-lg border-l-8 border-purple-500 hover:shadow-xl transition-shadow duration-300 ease-in-out h-32 w-full">
      <div className="flex items-center space-x-4">
        <HomeIcon className="h-12 w-12 text-purple-600 flex-shrink-0" />
        <p className="text-sm font-medium text-gray-800 mb-1">Dependencias:</p>
      </div>
      <p className="text-xs font-semibold text-gray-700">{vehicleDependencies.join(", ")}</p>
    </div>
  </div>

  {/* ROW 2: Gráfico de barras de inspección */}
  <div className="w-full bg-gray-50 rounded-lg shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
    <BarChart data={inspectionData} />
  </div>

  {/* ROW 3: Estadísticas de inspección */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
    {/* Total Inspecciones */}
    <div className="flex flex-col items-end justify-between p-4 text-right rounded-lg bg-yellow-50 shadow-lg border-l-8 border-yellow-500 hover:shadow-xl transition-shadow duration-300 ease-in-out h-32 w-full">
      <div className="flex items-center space-x-4">
        <ShieldCheckIcon className="h-12 w-12 text-yellow-600 flex-shrink-0" />
        <p className="text-sm font-medium text-gray-800 mb-1">Total Inspecciones:</p>
      </div>
      <p className="text-3xl font-bold text-yellow-700">{numberInspection}</p>
    </div>

    {/* Inspecciones hoy */}
    <div className="flex flex-col items-end justify-between p-4 text-right rounded-lg bg-green-50 shadow-lg border-l-8 border-green-500 hover:shadow-xl transition-shadow duration-300 ease-in-out h-32 w-full">
      <div className="flex items-center space-x-4">
        <PaperAirplaneIcon className="h-12 w-12 text-green-600 flex-shrink-0" />
        <p className="text-sm font-medium text-gray-800 mb-1">Inspecciones hoy:</p>
      </div>
      <p className="text-3xl font-bold text-green-700">{inspectionsToday}</p>
    </div>

    {/* Inspecciones este mes */}
    <div className="flex flex-col items-end justify-between p-4 text-right rounded-lg bg-blue-50 shadow-lg border-l-8 border-blue-500 hover:shadow-xl transition-shadow duration-300 ease-in-out h-32 w-full">
      <div className="flex items-center space-x-4">
        <ArchiveIcon className="h-12 w-12 text-blue-600 flex-shrink-0" />
        <p className="text-sm font-medium text-gray-800 mb-1">Inspecciones este mes:</p>
      </div>
      <p className="text-3xl font-bold text-blue-700">{inspectionsThisMonth}</p>
    </div>
  </div>

  {/* ROW 4: Contenido mixto */}
{/* ROW 4: Contenido mixto */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
  {/* Distribución Vehículos */}
  <div className="flex flex-col items-center justify-center text-center rounded-lg bg-rose-100 shadow-md border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out">
    <p className="text-sm text-gray-700 font-semibold mb-4">Distribución Vehículos</p>
    <div className="w-full">
      <FetchPieChart />
    </div>
  </div>

  {/* Distribución Usuarios */}
  <div className="flex flex-col items-center justify-center text-center rounded-lg bg-violet-100 shadow-md border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out">
    <p className="text-sm text-gray-700 font-semibold mb-4">Distribución Usuarios</p>
    <div className="w-full">
      <FetchPieChartUser />
    </div>
  </div>
</div>


  {/* Gráfico de barras anual */}
  <div className="w-full bg-gray-50 rounded-lg shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
    <BarChartYear data={yearlyInspectionData} />
  </div>
</div>

  );
};

export default DashboardStats;
