import axios, { AxiosRequestConfig } from "axios";


const _BASE_CONFIG: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

const authProtectedApi = axios.create({
  ..._BASE_CONFIG,
  headers: {
    ..._BASE_CONFIG.headers,
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

authProtectedApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 403) {
      localStorage.removeItem('authUser');
      localStorage.removeItem('accessToken');
    }
    console.log('error')
    return Promise.reject(error);
  }
);

export { authProtectedApi }
export const publicApi = axios.create({ ..._BASE_CONFIG });
