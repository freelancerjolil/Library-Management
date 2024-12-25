import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FeaturedBooks = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      const { data } = await axios.get('/books/featured');
      setBooks(data);
    };
    fetchFeaturedBooks();
  }, []);

  return (
    <div className="container mx-auto my-10">
      <h2 className="text-2xl font-bold mb-6">Featured Books</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="border p-4 rounded-lg shadow-lg hover:shadow-2xl cursor-pointer"
            onClick={() => navigate(`/book/${book._id}`)}
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-40 object-cover mb-4 rounded-lg"
            />
            <h3 className="text-xl font-semibold">{book.name}</h3>
            <p className="text-sm">Author: {book.authorName}</p>
            <p className="text-sm">Rating: {book.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedBooks;
