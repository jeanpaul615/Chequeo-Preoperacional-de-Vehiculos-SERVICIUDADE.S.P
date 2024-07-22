import axios from "axios";
import qs from "qs"; // Importa el módulo qs para formatear los datos como x-www-form-urlencoded
import Swal from "sweetalert2";

// authData debería ser un objeto que contiene los datos necesarios para autenticar
export const Auth = async (authData) => {
  try {
    // Formatear authData como x-www-form-urlencoded
    const formData = qs.stringify(authData);

    const response = await axios.post('http://localhost:8000/api/v1/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded' // Especificar el tipo de contenido como x-www-form-urlencoded
      }
    });

    // Suponiendo que el token está en la respuesta y se llama 'token'
    const access_token = response.data.access_token;
    if (access_token) {
      localStorage.setItem('access_token', access_token); // Guarda el token en el localStorage
      Swal.fire('Autenticación exitosa', 'Has iniciado sesión correctamente.', 'success');
    } else {
      Swal.fire('Error al autenticar', 'No se recibió un token válido.', 'error');
    }

    return response.data; // Devuelve los datos de la respuesta, si es necesario
  } catch (error) {
    // Muestra un mensaje de error claro
    Swal.fire('Error al autenticar', error.response?.data?.message || 'Ocurrió un error durante la autenticación.', 'error');
  }
}
