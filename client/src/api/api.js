import axios from "axios";
import queryString from "query-string";
import { getFromStorage } from "../store/setLocalStorage";

const token = getFromStorage('token')
const api = axios.create({
    // baseURL: 'http://localhost:5000',
    baseURL: process.env.REACT_APP_SERVER_URL,
    headers:{
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${token}`
    },
    paramsSerializer: params => queryString.stringify(params),
    withCredentials: true // Đặt withCredentials thành true để Axios tự động gửi cookie của trình duyệt
})


export default api;