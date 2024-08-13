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
      <div className="items-center justify-center flex rounded-lg border shadow-xl md:h-44 w-full p-4 bg-white"> {/* Ajusta la altura aquí según tus necesidades */}
        <Bar data={chartData} options={options} />
      </div>
  );
};

export default BarChartYear;
