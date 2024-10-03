import axios from "axios";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../../../containers/Api"; 

// Asegúrate de tener un token almacenado después de iniciar sesión
const token = localStorage.getItem('access_token');

export const GetIndicators = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/indicators`, {
      headers: {
        'Authorization': `Bearer ${token}` // Agrega el token al encabezado de la solicitud
      }
    });
    return response.data;
  } catch (error) {
    Swal.fire('Error al obtener los vehículos:', error.message);
  }
}



export const GetNameIndicators = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/indicators/getindicators`, {
      headers: {
        'Authorization': `Bearer ${token}` // Agrega el token al encabezado de la solicitud
      }
    });
    return response.data;
  } catch (error) {
    Swal.fire('Error al obtener los indicadores:', error.message);
  }
}
