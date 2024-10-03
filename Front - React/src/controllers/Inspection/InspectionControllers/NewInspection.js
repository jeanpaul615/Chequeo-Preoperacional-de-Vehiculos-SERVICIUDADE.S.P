import axios from "axios";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../../../containers/Api"; 

// Asegúrate de tener un token almacenado después de iniciar sesión
const token = localStorage.getItem('access_token'); // O sessionStorage.getItem('authToken')

export const NewVehicleCondition = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/inspection/newvehiclecondition`, 
      data, // Envía directamente el objeto data
      {
        headers: {
          'Authorization': `Bearer ${token}`, // Agrega el token al encabezado de la solicitud
          'Content-Type': 'application/json' // Asegúrate de que el tipo de contenido sea JSON
        }
      }
    );
    return response.data;
  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: `Error al agregar condicion del vehiculo: ${error.response?.data?.message || 'Conductor ya registrado'}`,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
}
export const NewInspection = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/inspection/newinspection`, 
      data, // Envía directamente el objeto data
      {
        headers: {
          'Authorization': `Bearer ${token}`, // Agrega el token al encabezado de la solicitud
          'Content-Type': 'application/json' // Asegúrate de que el tipo de contenido sea JSON
        }
      }
    );
    return response.data;
  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: `Error al crear inspecion: ${error.response?.data?.message || 'Conductor ya registrado'}`,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
}

