
import Example from "./Graphics/DataChartComposed";

const StatsModal = ({ closeModal, selectedIndicator }) => {
  return (
    <div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="modal-content relative bg-white p-6 rounded-lg shadow-xl w-60 max-w-4xl">
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
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
        <h2 className="text-lg font-semibold mb-4">
          Estadísticas del Indicador
        </h2>
        <Example />
        <title className="text-base">
          {`Indicador seleccionado: ${selectedIndicator}`}
        </title>
      </div>
    </div>
  );
};

export default StatsModal;
