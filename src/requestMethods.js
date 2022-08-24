import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const axiosJWT = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
})

// For Login, Register, Forgot PW, reset Pw
export const publicRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});