import React, { Suspense } from "react";

const DataChartComposed = React.lazy(() => import("./Graphics/DataChartComposed"));
const DataChartAmount = React.lazy(() => import("./Graphics/DataChartAmount"));
const PieChart = React.lazy(() => import("./Graphics/PieChart"));
const HighestValue = React.lazy(() => import("./Graphics/HighestValue"));
const LowestValue = React.lazy(() => import("./Graphics/LowestValue"));
const PromValue = React.lazy(() => import("./Graphics/PromValue"));
const SplineArea = React.lazy(() => import("./Graphics/SplineArea"));
const MedianValue = React.lazy(() => import("./Graphics/MedianValue"));

const StatsModal = ({ closeModal, selectedIndicator }) => {
  return (
    <div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="modal-content relative overflow-auto y max-h-screen bg-gray-100 p-4 sm:p-6 rounded-lg shadow-xl max-w-3xl w-auto h-auto">
        {/* Close button */}
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          aria-label="Close modal"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Title */}
        <div className="justify-center text-center mb-6 flex">
          <h2 className="text-2xl font-semibold text-gray-900">
            Estadísticas del Indicador:   
          </h2>
          <p className="text-2xl font-bold text-green-700">
            ({selectedIndicator})
          </p>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* DataChartComposed */}
          <div className="h-56 bg-gray-50 rounded-lg shadow-lg p-2">
            <h1 className="font-medium text-center">Valores del Indicador</h1>
            <Suspense fallback={<div>Cargando gráfico...</div>}>
              <DataChartComposed selectedIndicator={selectedIndicator} />
            </Suspense>
          </div>

          {/* DataChartAmount */}
          <div className="h-56 bg-gray-50 rounded-lg shadow-lg p-2">
            <h1 className="font-medium text-center">
              Valores de cada Indicador (Año Actual)
            </h1>
            <Suspense fallback={<div>Cargando gráfico...</div>}>
              <DataChartAmount selectedIndicator={selectedIndicator} />
            </Suspense>
          </div>

          {/* PieChart */}
          <div className="h-48 bg-gray-50 rounded-lg shadow-lg p-2 flex justify-center items-center">
            <h1 className="font-medium text-center">
              Variables enlazadas al indicador
            </h1>
            <Suspense fallback={<div>Cargando gráfico...</div>}>
              <PieChart selectedIndicator={selectedIndicator} />
            </Suspense>
          </div>

          {/* Highest and Lowest Values */}
          <div className="h-48 bg-gray-50 rounded-lg shadow-lg p-5 grid justify-center items-center">
            <div className="grid">
              <h1 className="font-medium text-center">
                Valor Mayor del Indicador:
              </h1>
              <Suspense fallback={<div>Cargando...</div>}>
                <HighestValue selectedIndicator={selectedIndicator} />
              </Suspense>
            </div>
            <hr className="mt-10 border-t-2 border-gray-300 rounded-full shadow-sm"></hr>
            <div className="grid mt-4">
              <h1 className="font-medium text-center">
                Valor Menor del Indicador:
              </h1>
              <Suspense fallback={<div>Cargando...</div>}>
                <LowestValue selectedIndicator={selectedIndicator} />
              </Suspense>
            </div>
          </div>

          {/* Promedio y Mediana */}
          <div className="h-24 bg-gray-50 rounded-lg shadow-lg p-5 grid justify-center items-center">
            <h1 className="font-medium text-center">Promedio del Indicador:</h1>
            <Suspense fallback={<div>Cargando...</div>}>
              <PromValue selectedIndicator={selectedIndicator} />
            </Suspense>
          </div>

          <div className="h-24 bg-gray-50 rounded-lg shadow-lg p-5 grid justify-center items-center">
            <h1 className="font-medium text-center">Mediana del Indicador:</h1>
            <Suspense fallback={<div>Cargando...</div>}>
              <MedianValue selectedIndicator={selectedIndicator} />
            </Suspense>
          </div>

          {/* SplineArea */}
          <div className="h-full w-full md:col-span-2 bg-gray-50 rounded-lg shadow-lg p-5 grid justify-center items-center">
            <h1 className="font-medium text-center">Trazabilidad de Variables:</h1>
            <Suspense fallback={<div>Cargando gráfico...</div>}>
              <SplineArea selectedIndicator={selectedIndicator} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsModal;
