import { apiDefault } from ".";
import { ApiConstant } from "../constants/api.constant";

const itemSlider = () => ({
    getAllItemSlider: async () => apiDefault.get(ApiConstant.slider.getAll)
})
export const { getAllItemSlider } = itemSlider()