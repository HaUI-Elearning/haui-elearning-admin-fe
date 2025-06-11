import axios from "axios";
import { BASE_URL } from "../constants/api.constant";
export const sendOtpForgotPassword = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/forgot-password?email=${data.email}`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}