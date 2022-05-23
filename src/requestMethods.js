import axios from "axios";

const BASE_URL = "http://localhost:5000/";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN…zMDF9.QGj1QIaNNLBKHEzeEszufLMkffiCYFn4J-cqTjUjnaE";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `${TOKEN}` },
});
