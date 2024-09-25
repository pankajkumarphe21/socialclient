import axios from "axios";

const axiosInstance=axios.create({
    baseURL:'https://socialapi-three.vercel.app/',
});

export default axiosInstance;