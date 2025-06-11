import axios from "axios";
import { BASE_URL } from "../constants/api.constant";
export const resendOtpForgotPassword = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/resend-forgot-password-otp?email=${data.email}`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}