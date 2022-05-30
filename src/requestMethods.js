import axios from "axios";

const BASE_URL = "http://localhost:5000/";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTFmMzI3NDE4YzI2OTIwZDQzYjA5YyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NTM3MzIxNzl9.8gKnkEGOLqZt6oNVkZs8FuKsE9Q2KFc4w5FLw4rpH-g";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `${TOKEN}` },
});
