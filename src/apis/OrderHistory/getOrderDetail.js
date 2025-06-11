import axios from "axios";
import { BASE_URL } from "../../constants/api.constant";
export const fetchOrderDetail = async (paymentID) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await axios.get(
      `${BASE_URL}/PurchaseHistory/${paymentID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
