import React, { useEffect, useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import { Link, useParams } from 'react-router-dom';
import axios from '../axios/axiosInstance';
import LoadingSpinner from './LoadingSpinner';

const BooksByCategory = () => {
  const { category } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch books in the selected category using Axios
    axios
      .get(`/books/category/${category}`)
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
        setLoading(false);
      });
  }, [category]);

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div>
      <h1 className="text-3xl text-center font-bold py-6">
        Books in {category} Category
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div key={book._id} className="card shadow-lg p-4">
            <img
              src={book.image}
              alt={book.name}
              className="w-full h-40 object-cover rounded-t"
            />
            <h2 className="text-xl font-semibold">{book.name}</h2>
            <p className="text-sm">Author: {book.authorName}</p>
            <p className="text-sm">Category: {book.category}</p>
            <p className="text-sm">Quantity: {book.quantity}</p>
            <ReactStars
              count={5}
              value={book.rating || 0}
              edit={false}
              size={24}
            />
            <Link
              to={`/book/${book._id}`}
              className="btn w-full bg-primary hover:bg-secondary mt-4"
            >
              Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksByCategory;
