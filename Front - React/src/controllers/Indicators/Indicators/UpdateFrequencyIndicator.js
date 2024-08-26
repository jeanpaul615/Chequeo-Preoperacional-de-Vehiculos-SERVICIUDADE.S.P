import axios from "axios";
import Swal from "sweetalert2";

const token = localStorage.getItem("access_token");

export const UpdateFrequencyIndicator = async (id_indicador, newFrequency) => {
  try {
    console.log(id_indicador, newFrequency);
    const response = await axios.post(
      "http://localhost:8000/indicators/updatefrequencyindicator",
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
