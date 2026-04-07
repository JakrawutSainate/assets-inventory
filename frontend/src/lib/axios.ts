import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "/mock-api",
  timeout: 800,
});

export default axiosClient;
