import axios from "axios";
import { BASE_URL } from "../constants/api.constant";
export const verifySignUpUser = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/verify-register-otp`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}