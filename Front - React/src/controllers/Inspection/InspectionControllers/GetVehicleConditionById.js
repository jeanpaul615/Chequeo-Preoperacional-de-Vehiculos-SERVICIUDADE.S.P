import axios from "axios";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../../../containers/Api"; 

// Asegúrate de tener un token almacenado después de iniciar sesión
const token = localStorage.getItem('access_token'); // O sessionStorage.getItem('authToken')

export const GetVehicleConditionById = async (data) => {  
  try {
    const response = await axios.post(
      `${API_BASE_URL}/inspection/getvehicleconditionbyid`,
      {
        inspection_id: data, // Asegúrate de enviar 'data' en el cuerpo
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`, // Agrega el token al encabezado de la solicitud
          'Content-Type': 'application/json'  // Asegúrate de que el tipo de contenido sea JSON
        }
      }
    );
    return response.data;
  } catch (error) {
    Swal.fire('Error al obtener los vehículos:', error.message);
  }
};
