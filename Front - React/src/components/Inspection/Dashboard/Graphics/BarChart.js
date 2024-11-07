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
        backgroundColor: data.map((_, index) => `rgba(113, 173, 249, 0.1)`), // Color uniforme para las barras
        borderColor: data.map((_, index) => `rgba(54, 162, 235, 1)`), // Color uniforme para los bordes
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
          color: 'rgba(0, 0, 0, 0.05)', // Cuadrícula más suave en el eje X
          borderColor: 'rgba(0, 0, 0, 0.1)', // Línea de borde más suave
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
          color: 'rgba(0, 0, 0, 0.07)', // Cuadrícula más suave en el eje Y
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
    <div className="p-6">
      <div className="w-full h-64">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
