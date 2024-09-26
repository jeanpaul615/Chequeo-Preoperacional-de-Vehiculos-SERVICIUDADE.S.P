import axios from "axios";
import qs from "qs"; // Importa el módulo qs para formatear los datos como x-www-form-urlencoded
import Swal from "sweetalert2";

// authData debería ser un objeto que contiene los datos necesarios para autenticar
export const Auth = async (authData) => {
  try {
    // Formatear authData como x-www-form-urlencoded
    const formData = qs.stringify(authData);
    const response = await axios.post('http://localhost:8000/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded' // Especificar el tipo de contenido como x-www-form-urlencoded
      }
    });

    const { access_token, role, user_id } = response.data;

    if (access_token) {
      localStorage.setItem('access_token', access_token); // Almacena el token en sessionStorage
      sessionStorage.setItem('user_id', user_id); // Almacena el user_id en sessionStorage
      sessionStorage.setItem('role', role); // Almacena el user_id en sessionStorage
      console.log(user_id, role);
      Swal.fire('Autenticación exitosa', 'Has iniciado sesión correctamente.', 'success');
      return { access_token, user_id };
    } else {
      Swal.fire('Error al autenticar', 'No se recibió un token válido.', 'error');
      return null;
    }
  } catch (error) {
    Swal.fire('Error al autenticar', error.response?.data?.message || 'Ocurrió un error durante la autenticación.', 'error');
    return null;
  }
}
