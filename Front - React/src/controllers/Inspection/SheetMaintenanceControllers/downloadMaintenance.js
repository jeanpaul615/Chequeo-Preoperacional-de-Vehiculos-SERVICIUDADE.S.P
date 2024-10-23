import axios from "axios";
import { API_BASE_URL } from "../../../containers/Api"; 

export const downloadMaintenance = async (id_maintenance) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/sheetmaintenance/download`, {
      id_maintenance
    }, {
      responseType: 'blob'  // Para manejar archivos binarios
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error desconocido");
  }
};
