import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_API,
});

axiosInstance.interceptors.request.use((config) => {
  const keyApp = process.env.NEXT_PUBLIC_KEY_APP;

  config["headers"]["x-key-app"] = keyApp;

  config["headers"]["Content-Type"] = "application/json";

  config["headers"]["Accept"] = "application/json";

  //   config["headers"]["Authorization"] = `Bearer ${localStorage.getItem(
  //     "token"
  //   )}`;

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error({
      error,
    });
    return Promise.reject(error);
  }
);

export default axiosInstance;
