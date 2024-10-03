import axios from "axios";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../../../containers/Api"; // Ajusta la ruta según la ubicación de tu archivo api.js

const token = localStorage.getItem("access_token");

export const UpdateIndicator = async (data) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/indicators/updateindicator`,
      {
        indicador_id: data.id_indicador,
        valor: data.valor,
        periodo_inicio: data.periodo_inicio,
      }, // Enviar data tal cual
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      window.location.reload();
      return response.data;
    } else {
      throw new Error("Error al actualizar el indicador");
    }
  } catch (error) {
    Swal.fire("Error al actualizar el indicador", error.message, "error");
    return false;
  }
};
