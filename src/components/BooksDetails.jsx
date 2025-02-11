import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../axios/axiosInstance';
import { useAuth } from '../context/AuthContext';
import BorrowModal from './BorrowModal';

const BookDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axiosInstance.get(`/books/${id}`, {
          withCredentials: true,
        });
        setBook(response.data);
      } catch (error) {
        toast.error('Error fetching book details or unauthorized access');
        console.error(error);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleBorrow = () => {
    if (!user) {
      navigate('/signin'); // Redirect to login if not authenticated
      return;
    }

    if (book.quantity <= 0) {
      toast.error('This book is currently out of stock.');
      return;
    }

    setModalOpen(true);
  };

  const handleBorrowSubmit = async ({ bookId, returnDate }) => {
    const borrowData = {
      bookId: book._id,
      returnDate,
    };

    try {
      const response = await axiosInstance.post(
        `/borrow/${book._id}`,
        borrowData,
        {
          withCredentials: true,
        }
      );

      if (response.data.message === 'Book borrowed successfully') {
        toast.success('Book borrowed successfully!');
        setModalOpen(false);
        setBook((prevBook) => ({
          ...prevBook,
          quantity: prevBook.quantity - 1,
        }));
      } else {
        toast.error('Failed to borrow book.');
      }
    } catch (error) {
      toast.error('Error occurred while borrowing the book.');
      console.error(error);
    }
  };

  if (!book) {
    return <div className="text-center py-6">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        className="flex flex-col md:flex-row bg-white shadow-xl rounded-lg overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Book Image */}
        <div className="w-full md:w-1/3">
          <img
            src={book.image}
            alt={book.name}
            className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg"
          />
        </div>

        {/* Book Details */}
        <div className="w-full md:w-2/3 p-6 bg-gradient-to-b from-[#134479] via-[#21B1E6] to-[#2196F3] text-white rounded-b-lg md:rounded-r-lg">
          <h1 className="text-4xl font-semibold mb-4">{book.name}</h1>
          <p className="text-lg mb-2">Author: {book.authorName}</p>
          <p className="text-lg mb-2">Category: {book.category}</p>
          <p className="text-lg mb-4">Available: {book.quantity}</p>
          <p className="text-lg mb-4">Available: {book.shortDescription}</p>
          <p className="text-lg mb-4">Available: {book.bookContent}</p>
          <div className="flex items-center mb-4">
            <ReactStars
              count={5}
              value={book.rating || 0}
              edit={false}
              size={24}
              color="#FFC107"
              activeColor="#FFB300"
            />
          </div>
          <button
            className="btn bg-primary hover:bg-secondary text-white py-2 px-6 rounded-md transition-all duration-300 transform hover:scale-105"
            disabled={book.quantity <= 0}
            onClick={handleBorrow}
          >
            {book.quantity > 0 ? 'Borrow' : 'Out of Stock'}
          </button>
        </div>
      </motion.div>

      {/* Borrow Modal */}
      {isModalOpen && (
        <BorrowModal
          book={book}
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onBorrow={handleBorrowSubmit}
        />
      )}
    </div>
  );
};

export default BookDetails;
