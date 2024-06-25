import axios from "axios";

// AXIOS BASE URL
export const Axios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

// AXIOS INTERCEPTOR INCLUDE ACCESS & REFRESH TOKEN
Axios.interceptors.request.use(
  (config) => {
    // GET TOKEN
    const accessToken = localStorage.getItem("token");

    // SET TOKEN
    if (accessToken) {
      // @ts-ignore
      config.headers = {
        ...config.headers!,
        authorization: `Bearer ${accessToken}`,
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//AXIOS INTERCEPTOR FOR REFRESH TOKEN
Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log(originalRequest);
    //CHECK THE EXPIRE TOKEN ERROR
    if (
      error.response &&
      error.response.status === 401 &&
      originalRequest.url !== "api/v1/vendor/login" &&
      originalRequest.url !== "api/v1/vendor/refresh-login" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        // CALLED REFRESH-LOGIN API
        const { data } = await Axios.get("api/v1/vendor/refresh-token", {
          headers: {
            Authorization: `BEARER ${refreshToken}`,
          },
        });

        // UPDATE THE ACCESS TOKEN
        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refreshToken);

        return Axios(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const letsScanWebsitePath = "https://lets-scan.vercel.app";
