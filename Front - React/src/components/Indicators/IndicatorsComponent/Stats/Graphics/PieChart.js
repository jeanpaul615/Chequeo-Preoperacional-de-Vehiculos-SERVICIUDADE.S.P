import { Pie } from 'react-chartjs-2'; 
import React, { useState, useEffect } from 'react';
import { GetIndicators } from '../../../../../controllers/Indicators/Indicators/GetIndicators';
import moment from 'moment'; // Asegúrate de tener instalada la librería moment.js

const PieChart = ({ selectedIndicator }) => {
  const [indicatorData, setIndicatorData] = useState({
    labels: [],
    data: [],
    colors: [],
  });

  // Función para generar categorías de fechas
  const generateCategories = (frecuencia) => {
    const currentYear = moment().year();
    const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    
    switch (frecuencia) {
      case 'anual':
        return [`${currentYear}`];
      case 'semestral':
        return [`${currentYear}/06/01`, `${currentYear}/12/01`];
      case 'trimestral':
        return [`${currentYear}/03/01`, `${currentYear}/06/01`, `${currentYear}/09/01`, `${currentYear}/12/01`];
      case 'mensual':
        return months.map((_, index) => `${currentYear}/${index + 1}/01`);
      default:
        return [];
    }
  };

  // Función para obtener datos del indicador
  const fetchIndicatorData = async () => {
    try {
      const response = await GetIndicators();

      if (!selectedIndicator) {
        console.error("selectedIndicator is not defined");
        return;
      }

      const filteredData = response.filter(item => item.id_indicador === parseInt(selectedIndicator, 10));

      if (filteredData.length === 0) {
        console.error("No data found for selectedIndicator:", selectedIndicator);
        return;
      }

      const frecuencia = filteredData[0].frecuencia;
      const categories = generateCategories(frecuencia);

      const dataMap = new Map();
      filteredData.forEach(item => {
        const periodo = moment(item.periodo_inicio).format(frecuencia === 'anual' ? 'YYYY' : 'YYYY/MM/DD');
        dataMap.set(periodo, (dataMap.get(periodo) || 0) + item.valor);
      });

      const chartLabels = [];
      const chartData = [];
      const chartColors = [];
      
      categories.forEach(category => {
        chartLabels.push(category);
        chartData.push(dataMap.get(category) || 0); // Valor 0 para categorías faltantes
        chartColors.push('rgba(75, 192, 192, 0.6)'); // Puedes personalizar los colores aquí
      });

      setIndicatorData({
        labels: chartLabels,
        data: chartData,
        colors: chartColors,
      });
    } catch (error) {
      console.error('Error fetching indicator data:', error);
    }
  };

  useEffect(() => {
    if (selectedIndicator) {
      fetchIndicatorData();
    }
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
