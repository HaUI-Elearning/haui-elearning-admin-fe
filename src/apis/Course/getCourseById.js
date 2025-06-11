import axios from "axios";
import { BASE_URL } from "../../constants/api.constant";

export const getCourseById = async (courseId) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    const res = await axios.get(`${BASE_URL}/courses/${courseId}`, {
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    });

    console.log("Course data:", res.data.data);
    return res.data.data;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin khóa học:", error);
    throw error || "Lỗi không xác định!";
  }
};
