import axios from "axios";

const BASE_URL = "http://localhost:5000/";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOGUzNDRmY2U1ODdkMTYxODUzNTFjZiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NTM0ODY5MDl9.96Dh7-9CE61Z0LOYopKYq-VmjDeCGmjqlKLRPs9sx4g";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `${TOKEN}` },
});
