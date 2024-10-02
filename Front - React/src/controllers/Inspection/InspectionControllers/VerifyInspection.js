import axios from "axios";
import Swal from "sweetalert2";

// Asegúrate de tener un token almacenado después de iniciar sesión
const token = localStorage.getItem('access_token'); // O sessionStorage.getItem('authToken')

export const VerifyInspection = async (fecha, vehicle_id) => {
  try {
    const response = await axios.post(
      'http://localhost:8000/inspection/verifyinspection', // Endpoint de verificación
      { created_at: fecha, vehicle_id: vehicle_id }, // Datos enviados en el cuerpo de la solicitud
      {
        headers: {
          'Authorization': `Bearer ${token}` // Agrega el token al encabezado de la solicitud
        }
      }
    );
    return response.data; // Retorna los resultados de la verificación
  } catch (error) {
    Swal.fire('Error al verificar la inspección:', error.message);
    return null; // Manejo de errores, retorna null en caso de fallo
  }
};
