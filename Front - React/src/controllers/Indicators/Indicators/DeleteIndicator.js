import axios from "axios";
import Swal from "sweetalert2";

const token = localStorage.getItem("access_token");

export const DeleteIndicator = (data) => {
  if (!data || !data.periodo_inicio) {
    console.error("Invalid data passed to DeleteIndicator:", data);
    Swal.fire("Error", "Invalid data provided.", "error");
    return Promise.reject(new Error("Invalid data"));
  }

  const date = new Date(data.periodo_inicio);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${year}/${month}/${day}`;

  return axios.post(
    "http://localhost:8000/indicators/deleteindicator",
    {
      indicador_id: data.id_indicador,
      periodo_inicio: formattedDate,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then(response => {
      if (response.status === 200) {
        Swal.fire("Success", "Indicador eliminado con éxito", "success");
        return response.data;
      } else {
        throw new Error("Error al eliminar el indicador");
      }
    })
    .catch(error => {
      Swal.fire("Error al eliminar el indicador", error.message, "error");
      return false;
    });
};
