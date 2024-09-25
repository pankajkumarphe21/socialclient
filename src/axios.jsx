import axios from "axios";

const axiosInstance=axios.create({
    baseURL:process.env.BACKEND_URL || 'http://localhost:8800',
    withCredentials:true
});

export default axiosInstance;