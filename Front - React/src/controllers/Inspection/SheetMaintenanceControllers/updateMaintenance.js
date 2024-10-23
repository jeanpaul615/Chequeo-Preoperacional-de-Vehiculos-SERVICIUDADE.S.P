import axios from "axios";
import { API_BASE_URL } from "../../../containers/Api"; 

export const updateMaintenance = async (id_maintenance, license_plate, excel ) => {
    try {
      const formData = new FormData();
      formData.append('id_maintenance', id_maintenance);
      formData.append('license_plate', license_plate); 
      formData.append('excel', excel); 

      const response = await axios.post(`${API_BASE_URL}/sheetmaintenance/updatemaintenance`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Asegúrate de establecer el tipo de contenido
        },
      });
      return response.data; // Asegúrate de que esto contenga la estructura adecuada
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error desconocido");
    }
  };
  