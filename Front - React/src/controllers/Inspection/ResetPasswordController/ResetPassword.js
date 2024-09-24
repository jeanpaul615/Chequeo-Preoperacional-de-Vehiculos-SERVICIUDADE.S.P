import axios from "axios";

export const sendResetPasswordEmail = async (formData) => {
  try {
    const response = await axios.post("http://localhost:8000/request-password", formData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post(`http://localhost:8000/reset-password/${token}`, { password: newPassword });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
