import axios from "axios";
import Swal from "sweetalert2";

const token = localStorage.getItem("access_token");

export const UpdateDriver = async (data) => {
  try {
    // Definir las dos solicitudes en paralelo
    const [response1, response2] = await Promise.all([
      axios.put(
        "http://localhost:8000/users/updateuser", // Verifica esta URL en el backend
        {
            cedula: data.user_cedula,
            email: data.user_email,
            role: data.user_role,
            status: data.user_status,
            user_id: data.user_id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      ),
      axios.put(
        "http://localhost:8000/drivers/updatedriver", // Verifica esta URL en el backend
        {
            name: data.driver_name,
            license_until: data.driver_license_until,
            user_id: data.user_id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      ),
    ]);

    window.location.reload();
    console.log("Respuesta de la primera solicitud:", response1.data);
    console.log("Respuesta de la segunda solicitud:", response2.data);

    return true;
  } catch (error) {
    Swal.fire("Error al actualizar", error.message, "error");
    return false;
  }
};
