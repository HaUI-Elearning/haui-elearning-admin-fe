import axios from "axios";
import { BASE_URL } from "../constants/api.constant";

export const deleteReview = async (reviewID) => {
  const accessToken = localStorage.getItem("accessToken");
  const res = await axios.delete(
    `${BASE_URL}/Review/delete/${reviewID}`,

    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};
