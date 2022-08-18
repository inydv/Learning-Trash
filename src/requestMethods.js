import axios from "axios";

// For Refreshing Token
const refreshToken = async () => {
  try {
    await axios.post("http://localhost:5000/api/refresh");
  } catch (err) {
    console.log(err);
  }
};

export const axiosJWT = axios.create()

axiosJWT.interceptors.request.use(
  async (config) => {
    // let currentDate = new Date();
    // const decodedToken = jwt_decode(user.accessToken);
    // if (decodedToken.exp * 1000 < currentDate.getTime()) {
    //   const data = await refreshToken();
    //   config.headers["authorization"] = "Bearer " + data.accessToken;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// For Login, Register, Forgot PW, reset Pw
const BASE_URL = "http://localhost:5000/api";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});