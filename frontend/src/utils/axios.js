import axios from "axios";
import qs from "qs";

// serialization means converting a javascript object or array into a URL query String that can e sent in an HTTP request

export const axiosInstance = axios.create({
  baseURL: process.env.VITE_API_BASE_URL,
  withCredentials: true,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
});
