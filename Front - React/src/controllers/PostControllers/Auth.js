import axios from "axios";
import qs from "qs"; // Importa el módulo qs para formatear los datos como x-www-form-urlencoded

export const Auth = async (authData) => {
  try {
    // Formatear authData como x-www-form-urlencoded
    const formData = qs.stringify(authData);

    const response = await axios.post('http://localhost:8000/api/v1/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded' // Especificar el tipo de contenido como x-www-form-urlencoded
      }
    });

    console.log("Respuesta de login:", response);
    return response.data;
  } catch (error) {
    console.error('Error al autenticar:', error);
    throw error;
  }
}
