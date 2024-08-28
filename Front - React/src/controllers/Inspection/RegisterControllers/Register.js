import axios from "axios";
import qs from "qs"; // Importa el módulo qs para formatear los datos como x-www-form-urlencoded
import Swal from "sweetalert2";

// authData debería ser un objeto que contiene los datos necesarios para autenticar
export const Register = async (registerData) => {
  try {
    // Formatear authData como x-www-form-urlencoded
    const formData = qs.stringify(registerData);
    const response = await axios.post(
      "http://localhost:8000/auth/register",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // Especificar el tipo de contenido como x-www-form-urlencoded
        },
      }
    );
    return response.data;
  } catch (error) {
    Swal.fire(
      "Error al registrar",
      error.response?.data?.message ||
        "Ocurrió un error durante el registro.",
      "error"
    );
    return null;
  }
};
