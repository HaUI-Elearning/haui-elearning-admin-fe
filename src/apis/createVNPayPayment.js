
import axios from "axios";
import { BASE_URL } from "../constants/api.constant";

export const createVNPayPayment = async (courseIds) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.post(
      `${BASE_URL}/payment/create`,
      {
        courseIds,
        viaCart: true,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
