import React, { useEffect, useState } from 'react';
import PieChartUser from './PieChartUser';
import { GetUsers } from '../../../../controllers/DashboardControllers/Users';

const FetchPieChartUser = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetUsers(); // Debugging log
        if (result && Array.isArray(result)) {
          setData(result);
        } else {
          setData([]); // Default to empty array if result is not as expected
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setData([]); // Default to empty array on error
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <PieChartUser data={data} />
    </div>
  );
};

export default FetchPieChartUser;
