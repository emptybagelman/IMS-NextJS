import axios from "axios";

let axiosInstance = axios.create({
    baseURL: 'https://inspiremyserver.onrender.com'
});

// axiosInstance.defaults.headers.common["Access-Control-Allow-Origin"] = "*"

export default axiosInstance;