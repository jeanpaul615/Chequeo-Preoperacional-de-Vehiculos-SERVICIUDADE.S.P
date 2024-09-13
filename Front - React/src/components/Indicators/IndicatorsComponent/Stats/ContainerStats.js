import React, { useEffect, useState, Suspense } from "react";
import { GetIndicators } from "../../../../controllers/Indicators/Indicators/GetIndicators";
const StatsModal = React.lazy(() => import("./StatsModal"));

const ContainerStats = ({ closeModal }) => {
  const [formData, setFormData] = useState([]); // Array to hold the list of indicators
  const [selectedIndicator, setSelectedIndicator] = useState(""); // State for the selected indicator
  const [showStatsModal, setShowStatsModal] = useState(false); // State to control the stats modal

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetIndicators();
        if (response) {
          const uniqueIndicators = Array.from(
            new Set(response.map((data) => data.id_indicador))
          ).map((id_indicador) => {

            return response.find(
              (data) => data.id_indicador === id_indicador
            );
          });

          setFormData(uniqueIndicators);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setSelectedIndicator(e.target.value);
  };

  const handleViewStats = () => {
    if (selectedIndicator) {
      setShowStatsModal(true);
    }
  };

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
        <div className="flex justify-center items-center mb-4">
          <span className="text-base font-semibold pr-5">
            Selecciona un indicador:
          </span>
        </div>
        <hr className="border-gray-400 opacity-50 pt-2 mb-6" />
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1">
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 font-medium w-full"
              name="id_registro"
              value={selectedIndicator}
              required
              onChange={handleChange}
            >
              <option value="">
                Seleccione el indicador
              </option>
              {formData.map((data) => (
                <option key={data.id_registro} value={data.id_indicador}>
                  {"("}{data.id_indicador}{")"}
                  {"  "}
                  {data.nombre_indicador}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="pt-10">
          <button
            type="submit"
            onClick={handleViewStats}
            className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center transition ease-in-out duration-150"
          >
            Ver
          </button>
        </div>
        {showStatsModal && (
          <Suspense fallback={<div>Cargando...</div>}>
          <StatsModal
            closeModal={() => setShowStatsModal(false)}
            selectedIndicator={selectedIndicator}
          />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default ContainerStats;
