import axios from 'axios'
import { getItem, setItem, removeItem, KEY_ACCESS_TOKEN } from './localStorageManger';
import store from '../redux/store'
import { TOAST_FAILURE, TOAST_SUCCESS } from '../App';
import { showToast } from '../redux/slices/appConfigSlice';

export const axiosClient = axios.create({
     baseURL: import.meta.env.VITE_APP_BACKEND_URL,
     withCredentials: true,
})



axiosClient.interceptors.request.use(
     (request) => {
          const accessToken = getItem(KEY_ACCESS_TOKEN);
          request.headers['Authorization'] = `Bearer ${accessToken}`
          return request;
     }
);

axiosClient.interceptors.response.use(
     async (response) => {
          const data = response.data;
          if (data.status === 'ok') {
               return data
          }

          const originalRequest = response.config;
          const statusCode = data.statusCode;
          const error = data.message;
          store.dispatch(showToast({
               type:TOAST_FAILURE,
               message:error,
          }))

          // expire after 1 year so login
          if (statusCode === 401 && originalRequest.url === `${import.meta.env.VITE_APP_BACKEND_URL}/auth/refresh`) {
               removeItem(KEY_ACCESS_TOKEN)
               window.location.replace('/login', "_self")
               return Promise.reject(error)
          }
          // only if 401 statuscode ke case mein hume refresh karna hai
          if (statusCode === 401 && !originalRequest._retry) {
               originalRequest._retry = true;
               const response = await axios.create({
                    withCredentials: true,
               }).get(`${import.meta.env.VITE_APP_BACKEND_URL}/auth/refresh`)
               if (response.status === 'ok') {
                    setItem(KEY_ACCESS_TOKEN, response.result.accessToken)
                    originalRequest.headers['Authorization'] = `Bearer ${response.result.accessToken}`
                    return axios(originalRequest);
               }
          }
          return Promise.reject(error)
     }, async (error) => {
          store.dispatch(showToast({
               type: TOAST_SUCCESS,
               message: error.message
          }))
          return Promise.reject(error)
     }
);
