import axios from "axios";
import Swal from "sweetalert2";

// Asegúrate de tener un token almacenado después de iniciar sesión
const token = localStorage.getItem('access_token');

export const GetVariables = async () => {
  try {
    const response = await axios.get('http://localhost:8000/variables', {
      headers: {
        'Authorization': `Bearer ${token}` // Agrega el token al encabezado de la solicitud
      }
    });
    return response.data;
  } catch (error) {
    Swal.fire('Error al obtener los vehículos:', error.message);
  }
}

export const GetVariablesbyIndicators = async () => {
  try {
    const response = await axios.get('http://localhost:8000/variables/getvariables', {
      headers: {
        'Authorization': `Bearer ${token}` // Agrega el token al encabezado de la solicitud
      }
    });
    return response.data;
  } catch (error) {
    Swal.fire('Error al obtener los vehículos:', error.message);
  }
}

export const VariablesbyId = async (valor_indicador) => {
  try {
    const response = await axios.get('http://localhost:8000/variables/variablesbyid', {
      params: { valor_indicador }, // Enviar valor_indicador como parámetro de consulta
      headers: {
        'Authorization': `Bearer ${token}` // Agrega el token al encabezado de la solicitud
      }
    });
    return response.data;
  } catch (error) {
    Swal.fire('Error al obtener las variables:', error.message);
  }
}

