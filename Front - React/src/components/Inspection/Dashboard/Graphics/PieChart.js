import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, ArcElement, CategoryScale, LinearScale } from 'chart.js';
ChartJS.register(Tooltip, ArcElement, CategoryScale, LinearScale);

const PieChart = ({ data }) => {

  // Configura los datos de la gráfica circular
  const chartData = () => {
    const typeCount = data.reduce((acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(typeCount),
      datasets: [
        {
          data: Object.values(typeCount),
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 205, 86, 0.2)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 205, 86, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.raw}`;
          }
        }
      }
    },
  };

  return (
    <div className="items-center justify-center flex rounded-lg border shadow-xl h-40 w-full p-4 bg-white">
      <Pie data={chartData()} options={chartOptions} />
    </div>
  );
};

export default PieChart;
