import axios from "axios";

// AXIOS BASE URL
export const Axios = axios.create({
  baseURL: "https://lets-scan-server.onrender.com/",
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
        const { data } = await Axios.get("api/v1/vendor/refresh-token");

        // RETRY THE ORIGINAL REQUEST
        return Axios(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const menuMuseWebsitePath = "https://lets-scan.vercel.app";
