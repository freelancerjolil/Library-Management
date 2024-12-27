import axios from 'axios';

const API_URL = 'https://library-management-server-theta-eight.vercel.app'; // Adjust this URL for production

export const fetchBooks = async () => {
  const response = await axios.get(`${API_URL}/books`, {
    withCredentials: true,
  });
  return response.data; // Return the list of books
};

export const fetchBooksByCategory = async (category) => {
  const response = await axios.get(`${API_URL}/books/category/${category}`, {
    withCredentials: true,
  });
  return response.data; // Return books in the selected category
};

export const fetchBookDetails = async (id) => {
  const response = await axios.get(`${API_URL}/books/${id}`, {
    withCredentials: true,
  });
  return response.data; // Return details of the selected book
};
