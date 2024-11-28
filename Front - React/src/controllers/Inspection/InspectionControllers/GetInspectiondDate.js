import axios from "axios";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../../../containers/Api"; 
// Asegúrate de tener un token almacenado después de iniciar sesión
const token = localStorage.getItem('access_token'); // O sessionStorage.getItem('authToken')

export const GetInspectionDates = async (vehicle_id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/inspection/getdatesinspection`, 
        {vehicle_id},
        {
      headers: {
        'Authorization': `Bearer ${token}` // Agrega el token al encabezado de la solicitud
      }
    });
    return response;
  } catch (error) {
    Swal.fire('Error al obtener los vehículos:', error.message);
  }
}
