import React, { useEffect, useState } from 'react';
import PieChart from './PieChart'; // Asegúrate de usar la ruta correcta
import { GetVehicles } from '../../../../controllers/DashboardControllers/Vehicle';

const FetchPieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetVehicles();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <PieChart data={data} />
    </div>
  );
};

export default FetchPieChart;
