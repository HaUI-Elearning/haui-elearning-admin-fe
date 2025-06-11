import axios from "axios";
import { BASE_URL } from "../constants/api.constant";
export const changePassword = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/forgot-password/reset`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}