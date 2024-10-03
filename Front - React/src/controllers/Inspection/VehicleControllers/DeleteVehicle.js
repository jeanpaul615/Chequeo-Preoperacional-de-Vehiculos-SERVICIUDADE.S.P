import axios from "axios";
import Swal from "sweetalert2";
import qs from "qs";
import { API_BASE_URL } from "../../../containers/Api"; 

const token = localStorage.getItem("access_token");

export const DeleteVehicle = (vehicle_id) => {
  return axios.post(
    `${API_BASE_URL}/vehicles/deletevehicle`,
    qs.stringify({
      vehicle_id: vehicle_id,  // Asegúrate de que vehicle_id tenga un valor válido
    }),
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',  // Cambia el tipo de contenido
      },
    }
  )
  .then(response => {
    if (response.status === 200) {
      Swal.fire("Success", "Vehículo eliminado con éxito", "success");
      return response.data;
    } else {
      throw new Error("Error al eliminar el vehículo");
    }
  })
  .catch(error => {
    console.error("No se pudo eliminar el vehiculo:", error.response);  // Captura y muestra los detalles del error
    Swal.fire("No se pudo eliminar el vehiculo", "Tiene Inspecciones Vinculadas, elimina primero las inspecciones.", "error");
    return false;
  });
};
