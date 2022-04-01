import axios from "axios";

const BASE_URL = "http://localhost:5000/";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDQ0N2U0YTczYjRlNDJkMTUyOWY1ZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0ODY0MjgwMn0.K-cu7Gk-_jExidG-xXxGeqBk1o6Cv0MhE8KhuWM31ig";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `nitin ${TOKEN}` },
});
