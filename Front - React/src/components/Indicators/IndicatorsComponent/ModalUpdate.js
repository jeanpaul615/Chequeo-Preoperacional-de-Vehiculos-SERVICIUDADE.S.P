import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { UpdateIndicator } from "../../../controllers/Indicators/Indicators/UpdateIndicator";
import { UpdateFrequencyIndicator } from "../../../controllers/Indicators/Indicators/UpdateFrequencyIndicator";

const ModalUpdate = ({ isOpen, onRequestClose, indicator }) => {
  const [formData, setFormData] = useState({});
  const [originalFrequency, setOriginalFrequency] = useState("");

  const labelMap = {
    id_indicador: "Id Indicador",
    frecuencia: "Frecuencia",
    valor: "Valor",
    periodo_inicio: "Periodo de Inicio",
  };

  useEffect(() => {
    if (indicator && Object.keys(indicator).length > 0) {
      const formattedData = {
        ...indicator,
        periodo_inicio: indicator.periodo_inicio
          ? indicator.periodo_inicio.split("T")[0]
          : "",
      };
      setFormData(formattedData);
      setOriginalFrequency(formattedData.frecuencia);
    }
  }, [indicator]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...formData,
        periodo_inicio: formatDate(formData.periodo_inicio),
      };

      // Verificar si la frecuencia ha cambiado
      if (formData.frecuencia !== originalFrequency) {
        const updateFrequencySuccess = await UpdateFrequencyIndicator(
          formData.id_indicador,
          formData.frecuencia
        );
        if (!updateFrequencySuccess) throw new Error("Error al actualizar la frecuencia");
      }

      const response = await UpdateIndicator(formattedData);

      if (response) {
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Los datos se han guardado correctamente.",
        });
        onRequestClose();
      } else {
        throw new Error("Error al actualizar el indicador");
      }
    } catch (error) {
      console.error("Error al guardar datos:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se logró actualizar el indicador.",
      });
    }
  };

  if (!isOpen) return null;

  const filteredKeys = Object.keys(formData).filter(
    (key) => key !== "Estado" && key !== "nombre_indicador"
  );

  return (
    <div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="modal-content relative bg-white p-6 rounded-lg shadow-xl w-full max-w-4xl">
        <button
          type="button"
          onClick={onRequestClose}
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
            Actualizar Indicador:
          </span>
          <span className="text-sm font-medium">
            {formData.nombre_indicador}
          </span>
        </div>
        <hr className="border-gray-400 opacity-50 pt-2 mb-6" />
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {filteredKeys.map((key) => (
            <div key={key} className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                {labelMap[key] || key}
              </label>
              {key === "id_indicador" || key === "periodo_inicio" ? (
                <input
                  type="text"
                  name={key}
                  value={formData[key] || ""}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 text-gray-700 cursor-not-allowed"
                />
              ) : key === "frecuencia" ? (
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 text-gray-700 cursor-not-allowed"
                  value={formData[key] || ""}
                  name={key}
                  required
                  onChange={handleChange}
                >
                  <option value="">Seleccione una frecuencia</option>
                  <option value="anual">Anual</option>
                  <option value="semestral">Semestral</option>
                  <option value="trimestral">Trimestral</option>
                  <option value="mensual">Mensual</option>
                  {/* Agregar más opciones según sea necesario */}
                </select>
              ) : (
                <input
                  type="text"
                  name={key}
                  value={formData[key] || ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 text-gray-700"
                  onChange={handleChange}
                />
              )}
            </div>
          ))}
          <div className="col-span-2 flex justify-end gap-4">
            <button
              type="submit"
              className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center transition ease-in-out duration-150"
            >
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalUpdate;
