import axios from "axios";
import { BASE_URL } from "../../constants/api.constant";

export const fetchOrders = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(`${BASE_URL}/PurchaseHistory/getAll`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const filtered = response.data.data.filter((order) => {
      const status = order.payment?.status?.toLowerCase();
      return status === "success" || status === "failed";
    });

    return filtered || [];
  } catch (error) {
    throw error.response?.data || error;
  }
};
