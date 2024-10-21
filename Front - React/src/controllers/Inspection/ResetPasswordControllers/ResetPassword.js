import axios from "axios";
import { API_BASE_URL } from "../../../containers/Api"; 

export const sendResetPasswordEmail = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/request-password-reset`, formData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const resetPassword = async (token, cedula, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/reset-password`, {
      cedula,
      password,
      token
    });
    return response.data; // Asegúrate de que esto contenga la estructura adecuada
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error desconocido");
  }
};
