import axios from "axios";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../../../containers/Api"; 

const token = localStorage.getItem("access_token");

export const UpdateVehicle = async (data) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/vehicles/updatevehicle`, // Verifica esta URL en el backend
      {
        type: data.type,
        license_plate: data.license_plate,
        brand: data.brand,
        area: data.area,
        soat_until: data.soat_until,
        rtm_until: data.rtm_until,
        seguro_contractual_until: data.seguro_contractual_until,
        seguro_extracontractual_until: data.seguro_extracontractual_until,
        vehicle_id: data.vehicle_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Respuesta de la solicitud:", response.data);

    Swal.fire({
      icon: "success",
      title: "Actualización exitosa",
      text: "Los datos del vehículo se han actualizado correctamente.",
    });

    return true;
  } catch (error) {
    console.error("Error al actualizar el vehículo:", error);
    Swal.fire("Error al actualizar", error.message, "error");
    return false;
  }
};
