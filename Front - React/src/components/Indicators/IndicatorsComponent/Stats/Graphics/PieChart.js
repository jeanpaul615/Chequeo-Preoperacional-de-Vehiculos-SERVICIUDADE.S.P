import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import React, { useState, useEffect } from 'react';
import { GetVariablesbyIndicators } from '../../../../../controllers/Indicators/Variables/GetVariables';

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ selectedIndicator }) => {
  const [indicatorData, setIndicatorData] = useState({
    labels: [],
    data: [],
    colors: [],
  });

  // Function to fetch variables data
  const fetchVariablesData = async () => {
    try {
      if (!selectedIndicator) {
        console.error("selectedIndicator is not defined");
        return;
      }

      const response = await GetVariablesbyIndicators(selectedIndicator);
      if (!response || response.length === 0) {
        console.error("No variables found for selectedIndicator:", selectedIndicator);
        return;
      }

      const filteredVariables = response.filter(
        (variable) => Number(variable.id_indicador) === Number(selectedIndicator)
      );

      const chartLabels = [];
      const chartData = [];
      const chartColors = [];

      filteredVariables.forEach((variable) => {
        chartLabels.push(variable.nombre); // Assuming 'nombre' is the variable name
        chartData.push(variable.id_variable); // Using id_variable as value
        chartColors.push(
          `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
            Math.random() * 255
          )}, ${Math.floor(Math.random() * 255)}, 0.6)`
        ); // Random colors
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
