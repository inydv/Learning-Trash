import axios from "axios";
import { refreshToken } from "./redux/user/userApiCall";
import { useDispatch, useSelector } from "react-redux";

export const axiosJWT = axios.create()

const MyComponent = () => {
  const dispatch = useDispatch();
  const { TokenDate } = useSelector((state) => state.user.currentUser);
  
  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      console.log(TokenDate, currentDate)
      if (TokenDate < currentDate.getTime()) {
       dispatch(refreshToken())
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return null;
}

// RefreshTokenDate
// For Login, Register, Forgot PW, reset Pw
const BASE_URL = "http://localhost:5000/api";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});