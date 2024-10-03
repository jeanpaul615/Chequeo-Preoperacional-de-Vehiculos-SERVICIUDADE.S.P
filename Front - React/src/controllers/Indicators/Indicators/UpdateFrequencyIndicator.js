import axios from "axios";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../../../containers/Api"; // Ajusta la ruta según la ubicación de tu archivo api.js

const token = localStorage.getItem("access_token");

export const UpdateFrequencyIndicator = async (id_indicador, newFrequency) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/indicators/updatefrequencyindicator`,
      {
        frecuencia: newFrequency,
        id_indicador,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      window.location.reload();
      return response.data;
    } else {
      throw new Error("Error al actualizar la frecuencia del indicador");
    }
  } catch (error) {
    Swal.fire("Error al actualizar la frecuencia", error.message, "error");
    return false;
  }
};
