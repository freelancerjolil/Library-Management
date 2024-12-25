import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookCategories = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  // Fetch book categories from the backend
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/books`);
        // Ensure that you're correctly defining and using category
        const books = response.data;
        // Example: If you're filtering books by category:
        const filteredBooks = books.filter(
          (book) => book.category === 'someCategory'
        );
        setBooks(filteredBooks);
      } catch (error) {
        console.error('Failed to fetch books:', error);
      }
    };
  }, []);

  // Extract unique categories from the books data
  const categories = [...new Set(books.map((book) => book.category))];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {categories.map((category) => (
        <div
          key={category}
          className="card cursor-pointer border rounded shadow-lg hover:shadow-xl transition"
          onClick={() => navigate(`/category/${category}`)}
          aria-label={`Go to ${category} category`}
        >
          <img
            src={`/images/${category}.jpg`} // Default category images, ensure the correct path
            alt={category}
            onError={(e) => (e.target.src = '/images/fallback.jpg')} // Fallback image
            className="w-full h-32 object-cover rounded-t"
          />
          <h3 className="text-center p-2 font-semibold">{category}</h3>
        </div>
      ))}
    </div>
  );
};

export default BookCategories;
