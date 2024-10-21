import axios from "axios";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../../../containers/Api"; 

const token = localStorage.getItem('access_token'); 

export const UpdateMaintenance = async (id_maintenance, solution) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/maintenance/updatemaintenance`,     
      {
        id_maintenance, // Aquí pasamos directamente el ID
        solution // Y la solución
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
