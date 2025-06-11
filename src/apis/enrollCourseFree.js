import axios from "axios";
import { BASE_URL } from "../constants/api.constant";

export const enrollCourse = async (courseId) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await axios.post(
      `${BASE_URL}/enrollments/${courseId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
        },
      }
    );
    console.log("res enroll", response);
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
