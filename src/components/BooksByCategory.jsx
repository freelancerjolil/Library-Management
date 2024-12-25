import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BooksByCategory = () => {
  const { categoryName } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/books/category/${books.category}`
        );
        setBooks(response.data);
      } catch (error) {
        console.error('Failed to fetch books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [categoryName]);

  if (loading) {
    return <p>Loading books...</p>;
  }

  if (!books.length) {
    return <p>No books found for the category "{categoryName}".</p>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Books in {categoryName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white shadow-md rounded-md p-4 hover:shadow-lg"
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold mt-2">{book.title}</h3>
            <p className="text-sm text-gray-600">By {book.author}</p>
            <button
              onClick={() => (window.location.href = `/books/${book._id}`)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
            >
              Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksByCategory;
