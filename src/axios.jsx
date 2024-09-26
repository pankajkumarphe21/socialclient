import axios from "axios";

const axiosInstance=axios.create({
    baseURL:"https://socialapi-three.vercel.app/",
    headers:"Access-Control-Allow-Origin"
});

export default axiosInstance;