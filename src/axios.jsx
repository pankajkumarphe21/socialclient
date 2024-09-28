import axios from "axios";

const axiosInstance=axios.create({
    baseURL:"https://socialapi-three.vercel.app",
    withCredentials:true
});

export default axiosInstance;