import axios from "axios";
import { BASE_URL } from "../constants/api.constant";
export const resendOtpSignUp = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/resend-otp?email=${data.email}`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}