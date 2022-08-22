import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const axiosJWT = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
})

axiosJWT.interceptors.request.use(
  async (config) => {
    let currentDate = new Date();
    if (localStorage.getItem("TokenDate").getTime() < currentDate.getTime()) {
      const res = await axios.post("http://localhost:5000/api/refresh");
      localStorage.setItem("TokenDate", res.data.TokenDate);
      localStorage.setItem("RefreshTokenDate", res.data.RefreshTokenDate);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// RefreshTokenDate
// For Login, Register, Forgot PW, reset Pw
export const publicRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});