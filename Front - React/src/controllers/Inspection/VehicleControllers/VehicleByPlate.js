import axios from "axios";
import Swal from "sweetalert2";
import qs from "qs";
const token = localStorage.getItem("access_token");
export const VehiclebyPlate = async (license_plate) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/vehicles/vehiclebyplate', // Correct the typo here
        qs.stringify({ license_plate: license_plate }), // Convert the object to x-www-form-urlencoded
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Add the token to the request header
            'Content-Type': 'application/x-www-form-urlencoded' // Ensure content type is correct
          }
        }
      );
      return response.data;
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: `Error consultando conductor: ${error.message}`,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };
  