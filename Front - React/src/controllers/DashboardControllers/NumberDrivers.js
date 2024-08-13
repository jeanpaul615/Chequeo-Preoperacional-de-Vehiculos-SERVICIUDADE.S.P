import axios from "axios";
import Swal from "sweetalert2";

// Asegúrate de tener un token almacenado después de iniciar sesión
const token = localStorage.getItem('access_token'); // O sessionStorage.getItem('authToken')

export const NumbersDrivers = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/v1/drivers/', {
      headers: {
        'Authorization': `Bearer ${token}` // Agrega el token al encabezado de la solicitud
      }
    });
    return response.length;
  } catch (error) {
    Swal.fire('Error al obtener los vehículos:', error.message);
  }
}
