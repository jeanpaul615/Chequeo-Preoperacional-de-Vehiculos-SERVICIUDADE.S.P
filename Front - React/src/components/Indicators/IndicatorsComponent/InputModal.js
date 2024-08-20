import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { GetIndicators } from "../../../controllers/Indicators/Indicators/GetIndicators";
import { VariablesbyId } from "../../../controllers/Indicators/Variables/GetVariables";
import CalculateIndicator from './CalculateIndicator'; // Make sure the path is correct

const InputModal = ({ isOpen, onRequestClose }) => {
  const [variables, setVariables] = useState([]);
  const [indicators, setIndicators] = useState([]);
  const [selectedIndicator, setSelectedIndicator] = useState('');
  const [inputs, setInputs] = useState({});
  const [period, setPeriod] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    const fetchIndicators = async () => {
      try {
        const fetchedIndicators = await GetIndicators();
        setIndicators(fetchedIndicators || []);
      } catch (error) {
        console.error('Error fetching indicators:', error);
      }
    };

    fetchIndicators();
  }, []);

  useEffect(() => {
    const fetchVariables = async () => {
      if (selectedIndicator) {
        try {
          const indicatorId = indicators.find(ind => ind.nombre_indicador === selectedIndicator)?.id_indicador;
          if (indicatorId) {
            const fetchedVariables = await VariablesbyId(indicatorId);
            setVariables(fetchedVariables || []);
          }
        } catch (error) {
          console.error('Error fetching variables:', error);
        }
      }
    };

    fetchVariables();
  }, [selectedIndicator, indicators]);

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleCalculate = (calculatedValue) => {
    setValue(calculatedValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', { ...inputs, period, value });
  };

  const selectedIndicatorId = indicators.find(ind => ind.nombre_indicador === selectedIndicator)?.id_indicador;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="md:pl-28 lg:pl-28 fixed inset-0 flex items-center justify-center bg-black bg-opacity-75"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75"
      contentLabel="Input Modal"
      ariaHideApp={false}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg md:max-w-2xl mx-auto relative">
        <button
          type="button"
          onClick={onRequestClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
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
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Registrar Indicador
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              {variables.length > 0 ? (
                variables.map((variable, index) => (
                  <div key={index} className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">
                      {`${variable.nombre}:`}
                    </label>
                    <input
                      type="number"
                      name={variable.nombre}
                      value={inputs[variable.nombre] || ""}
                      onChange={handleChange}
                      required
                      className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                ))
              ) : (
                <p>No hay variables</p>
              )}
              <CalculateIndicator
                variables={Object.keys(inputs).map(key => ({ nombre: key, value: inputs[key] }))}
                id_indicador={selectedIndicatorId}
                onCalculate={handleCalculate}
              />
            </div>
            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Nombre del indicador:
                </label>
                <select
                  value={selectedIndicator}
                  onChange={(e) => setSelectedIndicator(e.target.value)}
                  required
                  className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="">Seleccionar indicador</option>
                  {indicators.length > 0 ? (
                    indicators.map((indicator) => (
                      <option key={indicator.id_indicador} value={indicator.nombre_indicador}>
                        {indicator.nombre_indicador}
                      </option>
                    ))
                  ) : (
                    <option value="">No hay indicadores disponibles</option>
                  )}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Periodo:
                </label>
                <input
                  type="month"
                  name="period"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  required
                  className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-200 text-sm"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default InputModal;
