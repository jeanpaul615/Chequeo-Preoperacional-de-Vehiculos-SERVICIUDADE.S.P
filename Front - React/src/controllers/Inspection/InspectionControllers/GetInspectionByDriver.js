import axios from "axios";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../../../containers/Api"; 
// Asegúrate de tener un token almacenado después de iniciar sesión
const token = localStorage.getItem('access_token'); // O sessionStorage.getItem('authToken')

export const GetInspectionByDriver = async () => {
  //Trae los datos del conductor para hacer el filtro
  const get_driver_name = localStorage.getItem('driver');
const driver_name_parse = (JSON.parse(get_driver_name));
const driver_name = driver_name_parse.driver_name;

  try {
    const response = await axios.post(`${API_BASE_URL}/inspection/getinspectionsbydriver`, 
        {},
        {
      headers: {
        'Authorization': `Bearer ${token}` // Agrega el token al encabezado de la solicitud
      }
    });
    //Filtro para traer solo las inspecciones del conductor especifico
    const filteredinspectiondriver = response.data.filter((inspection) =>
      inspection.driver_name === driver_name
    );
    return filteredinspectiondriver;
  } catch (error) {
    Swal.fire('Error al obtener los vehículos:', error.message);
  }
}
