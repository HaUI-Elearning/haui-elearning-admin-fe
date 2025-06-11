import { apiDefault } from ".";
import { ApiConstant } from "../constants/api.constant";

const authApi = () => ({
    login: async({username, password}) => apiDefault.post(ApiConstant.auth.login,{
        username,
        password
    })
})

export const {
    login
} = authApi();