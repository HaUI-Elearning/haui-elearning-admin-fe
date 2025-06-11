import axios from "axios";
import { BASE_URL } from "../../constants/api.constant";

export const getCategoryCourses = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/courses/categorycourse`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
