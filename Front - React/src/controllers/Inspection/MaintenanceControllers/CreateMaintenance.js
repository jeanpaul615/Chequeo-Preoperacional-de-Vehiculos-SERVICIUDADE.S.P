import axios from "axios";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../../../containers/Api"; 

const token = localStorage.getItem('access_token'); 

export const CreateMaintenance = async (license_plate, inspection_id, driver_name, conditions, comment) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/maintenance/createmaintenance`,     
      {
        license_plate, inspection_id,driver_name, conditions, comment
      }, 
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    Swal.fire('Error al actualizar el mantenimiento:', error.message, 'error');
  }
}
