import axios from "axios";
import { BASE_URL } from "../constants/api.constant";

export const getEnrollmentsByUserId = async (userId, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/enrollments/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
