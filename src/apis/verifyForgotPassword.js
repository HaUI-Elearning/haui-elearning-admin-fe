import axios from "axios";
import { BASE_URL } from "../constants/api.constant";
export const verifyOtpForgotPassword = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/verify-forgot-password-otp`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}