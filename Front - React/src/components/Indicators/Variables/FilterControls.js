import React from "react";

/**
 * FilterControls Component
 * El componente FilterControls se encarga de filtrar la tabla, en base a el Mes, Año
 */
const FilterControls = ({
  selectedIndicator,
  setSelectedIndicator,
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
}) => {
  return (
    <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
      <select
        className="text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
      >
        <option value="">Todos los meses</option>
        <option value="1">Enero</option>
        <option value="2">Febrero</option>
        <option value="3">Marzo</option>
        <option value="4">Abril</option>
        <option value="5">Mayo</option>
        <option value="6">Junio</option>
        <option value="7">Julio</option>
        <option value="8">Agosto</option>
        <option value="9">Septiembre</option>
        <option value="10">Octubre</option>
        <option value="11">Noviembre</option>
        <option value="12">Diciembre</option>
      </select>

      <select
        className="text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
      >
        <option value="">Todos los años</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
      </select>
            {/* Selector de Indicador */}
            <select
        className="text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center w-full md:w-48"
        value={selectedIndicator}
        onChange={(e) => setSelectedIndicator(e.target.value)}
      >
        <option value="">Todos los indicadores</option>
        <option value="1">(1) Indicador Siniestros Viales TSV</option>
        <option value="2">(2) Riesgos de seguridad vial identificados RSVI</option>
        <option value="3">(3) Gestion de Riesgos Viales GRV</option>
        <option value="4">(4) Cumplimiento de metas CMPESV</option>
        <option value="5">(5) Cumplimiento de actividades plan anual PESV</option>
        <option value="6">(6) Cobertura programa de gestion Velocidad Empresarial GVE</option>
        <option value="7">(7) Excesos Límite de velocidad ELVL</option>
        <option value="8">(8) Inspecciones Diarias preoperacionales IDP</option>
        <option value="9">(9) Cumplimiento plan de mantenimiento preventivo de vehículos CPMPV</option>
        <option value="10">(10) Cumplimiento Plan de formación en seguridad vial CPFSV</option>
        <option value="11">(11) Cobertura Plan de formación en seguridad vial CPFSV</option>
        <option value="12">(12) Costo Siniestros Viales Por Nivel De Perdida</option>
        <option value="13">(13) No conformidades auditorias Cerradas</option>
        <option value="14">(14) Exceso de jornadas laborales</option>
      </select>
    </div>
    
  );
};

export default FilterControls;
