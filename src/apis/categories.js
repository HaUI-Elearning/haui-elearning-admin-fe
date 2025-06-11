import { apiDefault } from ".";
import { ApiConstant } from "../constants/api.constant";

const itemCategories = () => ({
    getAllItemCategories: async () => apiDefault.get(ApiConstant.categories.getAllCategories)
})


export const { getAllItemCategories,  } = itemCategories()
