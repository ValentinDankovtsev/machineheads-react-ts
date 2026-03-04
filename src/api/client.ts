import axios from 'axios';
import Cookies from 'js-cookie';
import history from '../utils/history';

const client = axios.create({
  baseURL: 'https://rest-test.machineheads.ru',
});

client.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data && typeof config.data === 'object' && !(config.data instanceof FormData)) {
      const formData = new FormData();
      Object.keys(config.data).forEach(key => {
        formData.append(key, config.data[key]);
      });
      config.data = formData;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get('refresh_token');
        
        if (!refreshToken) {
          history.push('/login');
          return Promise.reject(error);
        }

        const formData = new FormData();
        formData.append('refresh_token', refreshToken);

        const response = await axios.post('https://rest-test.machineheads.ru/auth/token-refresh', formData);

        const { access_token, refresh_token: newRefreshToken } = response.data;

        Cookies.set('token', access_token);
        Cookies.set('refresh_token', newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return client(originalRequest);
      } catch (refreshError) {
        Cookies.remove('token');
        Cookies.remove('refresh_token');
        history.push('/login');
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default client;