import React, { Suspense } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const DataChartComposed = React.lazy(() => import("./Graphics/DataChartComposed"));
const DataChartAmount = React.lazy(() => import("./Graphics/DataChartAmount"));
const PieChart = React.lazy(() => import("./Graphics/PieChart"));
const HighestValue = React.lazy(() => import("./Graphics/HighestValue"));
const LowestValue = React.lazy(() => import("./Graphics/LowestValue"));
const PromValue = React.lazy(() => import("./Graphics/PromValue"));
const SplineArea = React.lazy(() => import("./Graphics/SplineArea"));
const MedianValue = React.lazy(() => import("./Graphics/MedianValue"));

const StatsModal = ({ closeModal, selectedIndicator }) => {
  const printModalContent = async () => {
    const element = document.getElementById("stats-modal-content");
    const pdf = new jsPDF();

    // Usa html2canvas para convertir el contenido en un canvas
    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true // Asegúrate de permitir CORS si usas imágenes de fuentes externas
    });

    // Get the image data from the canvas
    const imgData = canvas.toDataURL("image/png");

    const pageHeight = pdf.internal.pageSize.height; // Altura de la página en puntos
    const imgHeight = (canvas.height * 190) / canvas.width; // Altura de la imagen en puntos

    let heightLeft = imgHeight; // Altura que queda para agregar

    let position = 10; // Posición inicial

    // Agrega la imagen al PDF
    pdf.addImage(imgData, 'PNG', 10, position, 190, imgHeight);
    heightLeft -= pageHeight; // Resta la altura de la página

    // Si hay más altura que queda, agrega nuevas páginas
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight; // Ajusta la posición

      pdf.addPage(); // Añade nueva página
      pdf.addImage(imgData, 'PNG', 10, position, 190, imgHeight); // Agrega la imagen en la nueva página
      heightLeft -= pageHeight; // Resta la altura de la página
    }

    // Guarda el PDF
    pdf.save(`estadisticas_${selectedIndicator}.pdf`);
  };

  return (
    <div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div id="stats-modal-content" className="modal-content relative overflow-auto y max-h-screen bg-gray-100 p-4 sm:p-6 rounded-lg shadow-xl max-w-3xl w-auto h-auto">
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

        {/* Print button with SVG */}
        <button
          type="button"
          onClick={printModalContent}
          className="absolute top-2 left-2 p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
          aria-label="Print modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-8 h-8 text-purple-600">
            <path fill="#B197FC" d="M128 0C92.7 0 64 28.7 64 64l0 96 64 0 0-96 226.7 0L384 93.3l0 66.7 64 0 0-66.7c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0L128 0zM384 352l0 32 0 64-256 0 0-64 0-16 0-16 256 0zm64 32l32 0c17.7 0 32-14.3 32-32l0-96c0-35.3-28.7-64-64-64L64 192c-35.3 0-64 28.7-64 64l0 96c0 17.7 14.3 32 32 32l32 0 0 64c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-64zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/>
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
            <h1 className="font-medium text-center">Tendencia del Indicador:</h1>
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
