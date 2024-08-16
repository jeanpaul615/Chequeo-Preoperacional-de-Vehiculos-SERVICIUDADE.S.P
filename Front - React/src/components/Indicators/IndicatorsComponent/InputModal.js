import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { GetIndicators } from "../../../controllers/Indicators/Indicators/GetIndicators";

const InputModal = ({
  isOpen,
  onRequestClose,
  variables = ["Variable1", "Variable2", "Variable3"],
  onSubmit,
}) => {
  // Inicializar el estado de las variables dinámicamente
  const [inputs, setInputs] = useState(
    variables.reduce((acc, variable) => {
      acc[variable] = "";
      return acc;
    }, {})
  );
  const [indicators, setIndicators] = useState([]); // Estado para almacenar los indicadores
  const [selectedIndicator, setSelectedIndicator] = useState(""); // Estado para el indicador seleccionado
  const [value, setValue] = useState("");
  const [period, setPeriod] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío de los datos
    console.log({ ...inputs, selectedIndicator, value, period });
    onSubmit?.({ ...inputs, selectedIndicator, value, period }); // Llama a la función onSubmit si está definida
    onRequestClose(); // Cierra el modal
  };

  useEffect(() => {
    const fetchIndicators = async () => {
      try {
        const fetchedIndicators = await GetIndicators();
        setIndicators(fetchedIndicators); 
      } catch (error) {
        console.error("Error fetching indicators:", error);
      }
    };
    fetchIndicators();
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="md:pl-28 lg:pl-28 fixed inset-0 flex items-center justify-center bg-black bg-opacity-75"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75"
      contentLabel="Input Modal"
      ariaHideApp={false}
    >
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full max-w-md md:max-w-4xl mx-auto">
        <button
          type="button"
          onClick={onRequestClose}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-hide="default-modal"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <h2 className="text-lg md:text-xl font-medium mb-3 md:mb-4 text-left">
          Registrar Indicador
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6"
        >
          {/* Columna de Variables */}
          <div className="flex flex-col space-y-4">
            {variables.map((variable, index) => (
              <div key={index} className="flex flex-col">
                <label className="mb-1 md:mb-2 text-sm md:text-base font-medium">{`${variable}:`}</label>
                <input
                  type="text"
                  name={variable}
                  value={inputs[variable] || ""}
                  onChange={handleChange}
                  required
                  className="p-1 md:p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                />
              </div>
            ))}
            <div className="flex justify-start">
              <button
                type="submit"
                className="bg-blue-500 text-white p-1 md:p-2 rounded hover:bg-blue-600 text-sm md:text-base"
              >
                Calcular
              </button>
            </div>
          </div>

          {/* Columna de Indicador, Valor y Periodo */}
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <label className="mb-1 md:mb-2 text-sm md:text-base font-medium">
                Nombre del indicador:
              </label>
              <select
                value={selectedIndicator}
                onChange={(e) => setSelectedIndicator(e.target.value)}
                required
                className="p-1 md:p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              >
                <option value="">Seleccionar indicador</option>
                {indicators.map((indicator) => (
                  <option key={indicator.id_indicador} value={indicator.nombre_indicador}>
                    {indicator.nombre_indicador}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="mb-1 md:mb-2 text-sm md:text-base font-medium">
                Periodo:
              </label>
              <input
                type="month"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                required
                className="p-1 md:p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 md:mb-2 text-sm md:text-base font-medium">
                Valor Indicador:
              </label>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
                className="p-1 md:p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              />
            </div>
          </div>
        </form>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={onRequestClose}
            className="bg-green-500 text-white p-1 md:p-2 rounded hover:bg-green-600 text-sm md:text-base"
          >
            Guardar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default InputModal;
