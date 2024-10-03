import axios from "axios";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../../../containers/Api"; 

const token = localStorage.getItem("access_token");

export const DeleteDriver = (data) => {
  if (!data) {
    console.error("Invalid data:", data);
    Swal.fire("Error", "Invalid data provided.", "error");
    return Promise.reject(new Error("Invalid data"));
  }


  return axios.post(
    `${API_BASE_URL}/users/deleteuser`,
    {
      user_id: data.user_id,
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
