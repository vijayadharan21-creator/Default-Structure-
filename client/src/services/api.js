import axios from 'axios';
import {getToken,setToken} from './token.js'
export const api=axios.create({
    baseURL:"http://localhost:5000/api",
    withCredentials:true
});

api.interceptors.request.use((config)=>{
    const token=getToken()
    if(token){
        config.headers.Authorization=`Bearer ${token}`
    }
    return config;
})
api.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {

    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry&&
  !originalRequest.url?.includes("/refresh")
    ) {

      originalRequest._retry = true;

      try {

        const response = await api.post(
          "/auth/refresh"
        );

        const newAccessToken =
          response.data.aToken;

        setToken(newAccessToken);

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return api(originalRequest);

      } catch (refreshError) {

        // Refresh token is expired/invalid
        setToken(null);

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);