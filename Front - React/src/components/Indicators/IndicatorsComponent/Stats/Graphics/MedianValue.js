import React, { useEffect, useState } from 'react';
import { GetIndicators } from '../../../../../controllers/Indicators/Indicators/GetIndicators';

export default function MedianValue({ selectedIndicator }) {
  const [medianValue, setMedianValue] = useState(null);

  // Función para calcular la mediana
  const calculateMedian = (values) => {
    const sortedValues = values.slice().sort((a, b) => a - b); // Ordenar los valores
    const mid = Math.floor(sortedValues.length / 2);

    if (sortedValues.length % 2 === 0) {
      // Si la longitud es par, devuelve el promedio de los dos valores centrales
      return (sortedValues[mid - 1] + sortedValues[mid]) / 2;
    } else {
      // Si la longitud es impar, devuelve el valor central
      return sortedValues[mid];
    }
  };

  const fetchVariablesData = async () => {
    try {
      const response = await GetIndicators();
      if (!response || response.length === 0) {
        console.error("No indicators found for selectedIndicator:", selectedIndicator);
        return;
      }

      // Filter the data based on the selectedIndicator
      const filteredIndicators = response.filter(indicator => parseInt(indicator.id_indicador) === parseInt(selectedIndicator));
      if (filteredIndicators.length > 0) {
        // Map the values and ensure they are numbers
        const validValues = filteredIndicators.map(indicator => parseFloat(indicator.valor)).filter(val => !isNaN(val));
        
        if (validValues.length > 0) {
          const medianValue = calculateMedian(validValues);
          
          setMedianValue(medianValue);
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
    <div className='text-center'>
      {medianValue !== null && medianValue !== null ? (
        <div>
          <p className='text-2xl text-blue-600 font-medium mb-2'>{medianValue}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
