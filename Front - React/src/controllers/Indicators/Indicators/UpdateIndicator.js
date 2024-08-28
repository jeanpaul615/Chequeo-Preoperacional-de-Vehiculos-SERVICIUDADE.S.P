import axios from "axios";
import Swal from "sweetalert2";

const token = localStorage.getItem("access_token");

export const UpdateIndicator = async (data) => {
  try {
    console.log(data);
    const response = await axios.post(
      "http://localhost:8000/indicators/updateindicator",
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
