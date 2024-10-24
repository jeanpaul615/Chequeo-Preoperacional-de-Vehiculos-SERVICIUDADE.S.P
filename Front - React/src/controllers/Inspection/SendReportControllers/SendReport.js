import axios from "axios";
import { API_BASE_URL } from "../../../containers/Api"; 
// Asegúrate de tener un token almacenado después de iniciar sesión
const token = localStorage.getItem('access_token'); // O sessionStorage.getItem('authToken')

export const SendReport = async (data, reports) => {

    try {
      // Destructure inspection_id to get the value
      const { inspection_id } = data.inspection_id; 
      const response = await axios.post(`${API_BASE_URL}/sendreport/`, {
        driver_id: data.driver_id,
        fecha: data.fecha,
        placa: data.placa,
        tipo_vehiculo: data.tipo_vehiculo,
        nombre_conductor: data.nombre_conductor,
        inspection_id: inspection_id,
        reports: data.reports
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      return response.data;
    } catch (error) {
      console.error('Error al enviar reporte:', error.response ? error.response.data : error.message);
      throw error;
    }
  };
  