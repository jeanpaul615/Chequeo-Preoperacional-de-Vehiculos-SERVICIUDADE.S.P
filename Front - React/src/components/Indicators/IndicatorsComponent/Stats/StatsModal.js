import DataChartComposed from "./Graphics/DataChartComposed";
import DataChartAmount from "./Graphics/DataChartAmount";
import PieChart from "./Graphics/PieChart";

const StatsModal = ({ closeModal, selectedIndicator }) => {
  return (
    <div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="modal-content relative bg-white p-6 sm:p-8 rounded-lg shadow-xl max-w-5xl w-full mx-4">
        {/* Botón de cierre */}
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          aria-label="Close modal"
        >
          <svg
            className="w-6 h-6"
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

        {/* Título */}
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Estadísticas del Indicador
        </h2>

        {/* Gráficos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <div className=" bg-gray-50 rounded-lg shadow-sm p-4">
            <DataChartComposed selectedIndicator={selectedIndicator} />
          </div>
          <div className="bg-gray-50 rounded-lg shadow-sm p-4">
            <DataChartAmount selectedIndicator={selectedIndicator} />
          </div>
          <div className="h-64 bg-gray-50 rounded-lg shadow-sm p-4 justify-center items-center flex">
            <PieChart selectedIndicator={selectedIndicator} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsModal;
