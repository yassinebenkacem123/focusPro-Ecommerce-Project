import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v2`,
    withCredentials: true,
});

export default api;