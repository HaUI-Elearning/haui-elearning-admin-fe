import axios from "axios";
import { BASE_URL } from "../constants/api.constant";

export const addReview = async ({ courseId, rating, comment }) => {
  const accessToken = localStorage.getItem("accessToken");
  const res = await axios.post(
    `${BASE_URL}/Review/add?CourseID=${courseId}&Rating=${rating}&Comment=${comment}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};
