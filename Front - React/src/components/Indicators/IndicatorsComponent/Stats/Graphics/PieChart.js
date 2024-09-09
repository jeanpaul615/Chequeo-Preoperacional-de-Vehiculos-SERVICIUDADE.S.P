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
        console.error("selectedIndicator is not defined");
        return;
      }

      const response = await GetVariablesbyIndicators(selectedIndicator);
      console.log(response);
      if (!response || response.length === 0) {
        console.error("No variables found for selectedIndicator:", selectedIndicator);
        return;
      }

      const filteredVariables = response.filter(variable => Number(variable.id_indicador) === Number(selectedIndicator));

     
      console.log(filteredVariables);
      const chartLabels = [];
      const chartData = [];
      const chartColors = [];

      filteredVariables.forEach(variable => {
        chartLabels.push(variable.nombre); // Asume que 'nombre' es el nombre de la variable
        chartData.push(variable.id_variable); // Supongo que quieres usar el id_variable como valor; puedes cambiarlo
        chartColors.push(`rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`); // Colores aleatorios
      });

      setIndicatorData({
        labels: chartLabels,
        data: chartData,
        colors: chartColors,
      });
    } catch (error) {
      console.error('Error fetching variables data:', error);
    }
  };

  useEffect(() => {
    if (selectedIndicator) {
      fetchVariablesData();
    } 
    // eslint-disable-next-line
  }, [selectedIndicator]);

  const data = {
    labels: indicatorData.labels,
    datasets: [
      {
        data: indicatorData.data,
        backgroundColor: indicatorData.colors,
      },
    ],
  };

  return <Pie data={data} />;
};

export default PieChart;
