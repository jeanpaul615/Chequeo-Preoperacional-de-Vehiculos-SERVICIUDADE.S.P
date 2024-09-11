import React, { useEffect, useState } from 'react';
import { GetIndicators } from '../../../../../controllers/Indicators/Indicators/GetIndicators';

export default function HighestValue({ selectedIndicator }) {
  const [highestValue, setHighestValue] = useState(null);

  const fetchVariablesData = async () => {
    try {
      const response = await GetIndicators();
      if (!response || response.length === 0) {
        console.error("No indicators found for selectedIndicator:", selectedIndicator);
        return;
      }

      // Filter the data based on the selectedIndicator and find the max value
      const filteredIndicators = response.filter(indicator => parseInt(indicator.id_indicador) === parseInt(selectedIndicator));
      if (filteredIndicators.length > 0) {
        // Map the values and ensure they are numbers
        const validValues = filteredIndicators.map(indicator => parseFloat(indicator.valor)).filter(val => !isNaN(val));
        
        if (validValues.length > 0) {
          const maxValue = Math.max(...validValues);
          setHighestValue(maxValue);
        } else {
          console.error("No valid numeric values found for selectedIndicator:", selectedIndicator);
        }
      } else {
        console.error("No data for selectedIndicator:", selectedIndicator);
      }

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

  return (
    <div>
      {highestValue !== null ? (
        <p className='text-center text-2xl text-orange-600 font-medium -mb-16'>{highestValue}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
