import axios from 'axios';

// Create Axios instance with the correct base URL and withCredentials set to true
const axiosInstance = axios.create({
  baseURL: 'https://library-management-server-theta-eight.vercel.app', // Backend base URL
  withCredentials: true, // Ensures cookies are sent with the request
});

export default axiosInstance;
