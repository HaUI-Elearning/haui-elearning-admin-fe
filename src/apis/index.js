
import axios from 'axios';
import { LocalStorage } from '../constants/localStorage.constant';
import { useNavigate } from 'react-router-dom'

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_SERVER}`,
    headers: {
        "Content-Type": 'Application/json'
    }
});

api.interceptors.request.use((config) => {
    const accessToken = JSON.parse(localStorage.getItem(LocalStorage.auth))?.token;
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config
}, Promise.reject);

api.interceptors.response.use(
    (value) => value.data,
    (error) => {
        if (error.code === 401) {
            const navigate = useNavigate();
            localStorage.removeItem(LocalStorage.auth);
            navigate('/login')
        }
        return Promise.reject(error);
    }
)

const apiDefault = axios.create({
    baseURL: `http://localhost:3000`,
    headers: {
        "Content-Type": 'Application/json'
    }
});

export {
    apiDefault,
    api
}
