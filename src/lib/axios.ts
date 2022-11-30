import Axios from 'axios';
import { showNotification } from '@mantine/notifications';

export const axios = Axios.create({
    baseURL: process.env.BASE_URL,
});

axios.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      const message = error.response?.data?.message || error.message;
      showNotification({
        title: 'Error',
        message,
        color: "red"
      })
      return Promise.reject(error);
    }
  );
