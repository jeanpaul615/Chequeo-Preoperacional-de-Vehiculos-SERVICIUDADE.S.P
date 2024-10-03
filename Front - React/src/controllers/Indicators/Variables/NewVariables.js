import axios from "axios";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../../../containers/Api"; 
// Asegúrate de tener un token almacenado después de iniciar sesión
const token = localStorage.getItem("access_token");

export const NewVariables = async (data) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/variables/register`,
      data, // Enviar los datos en el cuerpo de la solicitud
      {
        headers: {
          Authorization: `Bearer ${token}`, // Agrega el token al encabezado de la solicitud
        },
      }
    );
    return response.data;
  } catch (error) {
    Swal.fire("Error al registrar la variable", error.message, "error");
  }
};
