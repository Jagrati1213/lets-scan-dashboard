import axios from "axios";

// AXIOS BASE URL
export const Axios = axios.create({
  baseURL: "http://localhost:4000/api/v1/",
  withCredentials: true,
});

//AXIOS INTERCEPTOR FOR REFRESH TOKEN
Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    //CHECK THE EXPIRE TOKEN ERROR
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const { data } = await Axios.post("refresh-token");

        // RETRY THE ORIGINAL REQUEST
        return Axios(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
