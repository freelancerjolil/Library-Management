import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import { useParams } from 'react-router-dom';
import BorrowModal from './BorrowModal';

const BooksDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };
    fetchBookDetails();
  }, [id]);

  const handleBorrow = () => {
    setShowModal(true);
  };

  return (
    <div className="container mx-auto">
      {book && (
        <div>
          <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-64 object-cover mb-4"
          />
          <p>Author: {book.author}</p>
          <p>Category: {book.category}</p>
          <p>Quantity: {book.quantity}</p>
          <ReactStars value={book.rating} edit={false} size={24} />
          <button
            onClick={handleBorrow}
            disabled={book.quantity === 0}
            className="btn btn-primary mt-4"
          >
            Borrow
          </button>
        </div>
      )}

      {showModal && (
        <BorrowModal book={book} closeModal={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default BooksDetails;
