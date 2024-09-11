import React, { useEffect, useState } from 'react';
import { GetIndicators } from '../../../../../controllers/Indicators/Indicators/GetIndicators';

export default function PromValue({ selectedIndicator }) {
  const [promValue, setPromValue] = useState(null);

  const fetchVariablesData = async () => {
    try {
      const response = await GetIndicators();
      if (!response || response.length === 0) {
        console.error("No indicators found for selectedIndicator:", selectedIndicator);
        return;
      }

      // Filtrar los datos en función del selectedIndicator
      const filteredIndicators = response.filter(indicator => parseInt(indicator.id_indicador) === parseInt(selectedIndicator));

      if (filteredIndicators.length > 0) {
        // Mapear los valores asegurándose de que sean números válidos
        const validValues = filteredIndicators.map(indicator => parseFloat(indicator.valor)).filter(val => !isNaN(val));

        if (validValues.length > 0) {
          // Calcular el promedio manualmente
          const totalSum = validValues.reduce((acc, val) => acc + val, 0);
          const promValue = totalSum / validValues.length;

          setPromValue(promValue.toFixed(2)); // Redondear a dos decimales si es necesario
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
      {promValue !== null ? (
        <p className=' text-center text-2xl text-sky-600 font-medium'>{promValue}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
