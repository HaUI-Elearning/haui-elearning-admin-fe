import axios from "axios";
import { BASE_URL } from "../constants/api.constant";

export const filterComment = async (data) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/Review/filter/${data.courseId}`,
      {
        params: {
          Stars: data.Stars,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || "Lỗi không xác định!";
  }
};
