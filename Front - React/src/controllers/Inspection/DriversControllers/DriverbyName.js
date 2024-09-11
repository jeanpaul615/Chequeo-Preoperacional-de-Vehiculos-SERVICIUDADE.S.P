import axios from "axios";
import Swal from "sweetalert2";
import qs from "qs"; // Importar qs para convertir los datos en formato x-www-form-urlencoded

// Asegúrate de tener un token almacenado después de iniciar sesión
const token = localStorage.getItem('access_token'); // O sessionStorage.getItem('authToken')

export const DriverbyName = async (driver_name) => {
  try {
    const response = await axios.post(
      'http://localhost:8000/drivers/driverbyname',
      qs.stringify({ driver_name: driver_name }), // Convertir el objeto a formato x-www-form-urlencoded
      {
        headers: {
          'Authorization': `Bearer ${token}`, // Agrega el token al encabezado de la solicitud
          'Content-Type': 'application/x-www-form-urlencoded' // Asegúrate de que el tipo de contenido sea x-www-form-urlencoded
        }
      }
    );
    return response.data;
  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: `Error consultando conductor: ${error.message}`,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
}
