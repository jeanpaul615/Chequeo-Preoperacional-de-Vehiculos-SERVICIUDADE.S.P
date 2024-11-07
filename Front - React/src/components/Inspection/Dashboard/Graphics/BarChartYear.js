import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Registrar los componentes necesarios para el gráfico
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChartYear = ({ data }) => {
  // Agrupar los datos por año
  const groupedData = data.reduce((acc, item) => {
    const year = item.year;
    if (!acc[year]) {
      acc[year] = { label: year, value: 0 };
    }
    acc[year].value += item.value;
    return acc;
  }, {});

  // Convertir los datos agrupados en arrays
  const labels = Object.keys(groupedData);
  const values = labels.map(year => groupedData[year].value);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Inspecciones por Año',
        data: values,
        backgroundColor: labels.map((_, index) => `rgba(${(index * 40) % 255}, ${(index * 80) % 255}, ${(index * 120) % 255}, 0.2)`),
        borderColor: labels.map((_, index) => `rgba(${(index * 40) % 255}, ${(index * 80) % 255}, ${(index * 120) % 255}, 1)`),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'rgba(0, 0, 0, 1)', // Color de la leyenda
          font: {
            size: 14, // Tamaño de fuente de la leyenda
            family: '', // Fuente moderna para la leyenda
            weight: 'bold',
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0, 0)', // Fondo del tooltip
        titleColor: 'white', // Color del título del tooltip
        bodyColor: 'white', // Color del cuerpo del tooltip
        callbacks: {
          label: (context) => `Inspecciones: ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)', // Color de la cuadrícula del eje X
        },
        ticks: {
          color: 'rgba(0, 0, 0, 0.7)', // Color de las etiquetas del eje X
          font: {
            size: 14, // Tamaño de fuente de las etiquetas del eje X
            family: 'Arial, sans-serif', // Fuente moderna
            weight: 'bold', // Peso de la fuente
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)', // Color de la cuadrícula del eje Y
        },
        ticks: {
          color: 'rgba(0, 0, 0, 0.7)', // Color de las etiquetas del eje Y
          font: {
            size: 14, // Tamaño de fuente de las etiquetas del eje Y
            family: 'Arial, sans-serif', // Fuente moderna
            weight: 'bold', // Peso de la fuente
          },
        },
      },
    },
    layout: {
      padding: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      },
    },
    animation: {
      duration: 1000, // Duración de la animación al renderizar el gráfico
      easing: 'easeInOutQuad', // Tipo de animación
    },
  };

  return (
    <div className="w-full h-64">
    <Bar data={chartData} options={options} />
  </div>
  );
};

export default BarChartYear;