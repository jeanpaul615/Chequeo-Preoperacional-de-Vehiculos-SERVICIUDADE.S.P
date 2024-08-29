import React, { useEffect, useState } from "react";
import { GetIndicators } from "../../../../../controllers/Indicators/Indicators/GetIndicators";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const Example = () => {
    const [formData, setFormData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await GetIndicators();
          if (response) {
            // Mapea los datos para ajustarlos a la estructura esperada
            const formattedData = response.map(item => ({
              name: item.nombre_indicador, // Asegúrate de que estas propiedades existan en los datos
              valor: item.valor,
            }));
            setFormData(formattedData);
            console.log(formattedData); // Verifica la estructura de los datos
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }, []);

    return (
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart
          data={formData}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" scale="band" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="valor" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="valor" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    );
};

export default Example;
