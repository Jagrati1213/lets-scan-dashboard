import axios from "axios";

// Api url for access the options
export const apiClient = axios.create({
  baseURL: "http://localhost:3000/api/",
});
