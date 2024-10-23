import axios from "axios";
import { API_BASE_URL } from "../../../containers/Api"; 

export const createMaintenance = async (vehiclePlate, selectedFile) => {
  try {
    const formData = new FormData();
    formData.append('license_plate', vehiclePlate); // Agrega la placa
    formData.append('excel', selectedFile); // Agrega el archivo

    const response = await axios.post(`${API_BASE_URL}/sheetmaintenance/createmaintenance`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Asegúrate de establecer el tipo de contenido
      },
    });
    return response.data; // Asegúrate de que esto contenga la estructura adecuada
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error desconocido");
  }
};
