import { Pie } from 'react-chartjs-2';
import React, { useState, useEffect } from 'react';
import { GetVariablesbyIndicators } from '../../../../../controllers/Indicators/Variables/GetVariables';

const PieChart = ({ selectedIndicator }) => {
  const [indicatorData, setIndicatorData] = useState({
    labels: [],
    data: [],
    colors: [],
  });

  // Función para obtener las variables enlazadas al indicador seleccionado
  const fetchVariablesData = async () => {
    try {
      if (!selectedIndicator) {
        console.warn("selectedIndicator is not defined");
        return;
      }

      const response = await GetVariablesbyIndicators(selectedIndicator);

      if (!response || response.length === 0) {
        console.warn("No variables found for selectedIndicator:", selectedIndicator);
        return;
      }

      // Filtrar variables que correspondan al indicador seleccionado
      const filteredVariables = response.filter(
        (variable) => Number(variable.id_indicador) === Number(selectedIndicator)
      );

      // Preparar datos para el gráfico
      const chartLabels = filteredVariables.map((variable) => variable.nombre);
      const chartData = filteredVariables.map((variable) => variable.id_variable); // Cambia si necesitas otro valor
      const chartColors = filteredVariables.map(
        () =>
          `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
            Math.random() * 255
          )}, 0.6)` // Colores aleatorios
      );

      // Actualizar el estado con los datos procesados
      setIndicatorData({
        labels: chartLabels,
        data: chartData,
        colors: chartColors,
      });
    } catch (error) {
      console.error('Error fetching variables data:', error);
    }
  };

  // Ejecutar cuando el indicador seleccionado cambie
  useEffect(() => {
    fetchVariablesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndicator]);

  // Configuración de los datos del gráfico
  const data = {
    labels: indicatorData.labels,
    datasets: [
      {
        data: indicatorData.data,
        backgroundColor: indicatorData.colors,
      },
    ],
  };

  return (
    <div className="w-full flex justify-center items-center">
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
