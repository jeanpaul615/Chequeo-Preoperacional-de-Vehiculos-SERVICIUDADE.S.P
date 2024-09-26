import axios from "axios";
import Swal from "sweetalert2";
// Asegúrate de tener un token almacenado después de iniciar sesión
const token = localStorage.getItem('access_token'); // O sessionStorage.getItem('authToken')
const user_id = sessionStorage.getItem('user_id');
export const GetUsers = async () => {
  try {
    const response = await axios.get('http://localhost:8000/users/getuser', 
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
      text: `Error al agregar conductor: ${error.message}`,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
}

export const GetUserById = async () => {
  try {
    const response = await axios.post('http://localhost:8000/users/getuserbyid', 
      { user_id }, // Convertir el objeto a formato x-www-form-urlencoded
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
      text: `Error al agregar conductor: ${error.message}`,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
}


