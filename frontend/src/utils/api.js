// import axios from 'axios';

// export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// export const api = axios.create({
//   baseURL: `${API_URL}/api`
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('wargames_token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });


// import axios from "axios";

// // const API_URL =
// //   import.meta.env.VITE_API_URL || "http://localhost:4000";

// export const API_URL =
//   import.meta.env.VITE_API_URL || "http://localhost:4000";

// export const api = axios.create({
//   baseURL: API_URL,
//   withCredentials: false,
// });

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//      localStorage.getItem("wargames_token")
//       localStorage.removeItem("user");
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;


import axios from "axios";

export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4000";

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("wargames_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("wargames_token");
      localStorage.removeItem("user");
    }

    return Promise.reject(error);
  }
);

export default api;