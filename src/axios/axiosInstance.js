import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Change this to your backend URL
  withCredentials: true, // Important to send and receive cookies with each request
});

export default axiosInstance;
