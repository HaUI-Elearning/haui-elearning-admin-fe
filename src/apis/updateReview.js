import axios from "axios";
import { BASE_URL } from "../constants/api.constant";

export const updateReview = async ({ reviewId, rating, comment }) => {
  const accessToken = localStorage.getItem("accessToken");
  const res = await axios.put(
    `${BASE_URL}/Review/update?ReviewID=${reviewId}&Rating=${rating}&Comment=${comment}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};
