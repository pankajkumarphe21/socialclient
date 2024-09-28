import axios from "axios";

const axiosInstance=axios.create({
    baseURL:"https://socialapi-three.vercel.app",
    proxy:true
});

export default axiosInstance;