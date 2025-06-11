
import axios from "axios";
import { BASE_URL } from "../constants/api.constant";

export const fetchPaymentResult = async (queryString) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(
      `${BASE_URL}/payment/vnpay-return${queryString}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
