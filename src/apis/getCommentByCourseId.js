import axios from "axios";
import { BASE_URL } from "../constants/api.constant";

export const getCommentByCourseId = async (courseId) => {
  try {
    const response = await axios.get(`${BASE_URL}/Review/getAll/${courseId}`);
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
