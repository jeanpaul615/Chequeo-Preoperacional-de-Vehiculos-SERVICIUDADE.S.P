import axios from "axios";
import Swal from "sweetalert2";

// Asegúrate de tener un token almacenado después de iniciar sesión
const token = localStorage.getItem('access_token'); // O sessionStorage.getItem('authToken')

export const GetVehicles = async () => {
  try {
    const response = await axios.get('http://localhost:8000/vehicles', {
      headers: {
        'Authorization': `Bearer ${token}` // Agrega el token al encabezado de la solicitud
      }
    });
    return response.data;
  } catch (error) {
    Swal.fire('Error al obtener los vehículos:', error.message);
  }
}
