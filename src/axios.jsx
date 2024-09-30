import axios from "axios";

const axiosInstance=axios.create({
    baseURL:import.meta.env.VITE_APP_URL || 'https://socialapi-three.vercel.app',
    withCredentials:true
});

export default axiosInstance;