import axios from "axios";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../../../containers/Api"; 
// Asegúrate de tener un token almacenado después de iniciar sesión
const token = localStorage.getItem('access_token'); // O sessionStorage.getItem('authToken')

export const NewVehicle = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/vehicles/newvehicle`, 
      {
        type: data.type,
        license_plate: data.license_plate,
        brand: data.brand,
        area: data.area,
        soat_until: data.soat_until,
        rtm_until: data.rtm_until,
        seguro_contractual_until: data.seguro_contractual_until,
        seguro_extracontractual_until: data.seguro_extracontractual_until,
        vehicle_id : data.vehicle_id
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
      text: `Error al agregar vehiculos: Vehiculo ya registrado`,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
}
