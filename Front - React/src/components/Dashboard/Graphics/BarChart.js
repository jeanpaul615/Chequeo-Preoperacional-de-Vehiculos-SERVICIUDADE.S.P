import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Registrar los componentes necesarios para el gráfico
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        label: 'Inspecciones por Mes',
        data: data.map(item => item.value),
        backgroundColor: data.map((_, index) => `rgba(${(index * 40) % 255}, ${(index * 80) % 255}, ${(index * 120) % 255}, 0.2)`),
        borderColor: data.map((_, index) => `rgba(${(index * 40) % 255}, ${(index * 80) % 255}, ${(index * 120) % 255}, 1)`),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'rgb(0, 0, 0)', // Color de texto de la leyenda
        },
      },
      tooltip: {
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
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)', // Color de la cuadrícula del eje Y
        },
        ticks: {
          color: 'rgba(0, 0, 0, 0.7)', // Color de las etiquetas del eje Y
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
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg -m-3">
      <Bar data={chartData} options={options} width={320} height={52} />
    </div>
  );
};

export default BarChart;