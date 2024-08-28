import axios from "axios";
import Swal from "sweetalert2";

// Asegúrate de tener un token almacenado después de iniciar sesión
const token = localStorage.getItem('access_token'); // O sessionStorage.getItem('authToken')

export const NewDriver = async (data) => {
  try {
    const response = await axios.post('http://localhost:8000/drivers/newdriver', 
      {
        user_id: data.user_id,
        name: data.name,
        license_until: data.license_until
      }, 
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
      text: `Error al agregar conductor: Conductor ya registrado`,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
}
