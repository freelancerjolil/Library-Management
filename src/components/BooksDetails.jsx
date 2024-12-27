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
    // Fetch book details based on book ID using Axios
    const fetchBookDetails = async () => {
      try {
        const response = await axiosInstance.get(`/books/${id}`, {
          withCredentials: true, // Ensure cookies are sent with the request
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
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg">
        {/* Book Image */}
        <div className="w-full md:w-1/3">
          <img
            src={book.image}
            alt={book.name}
            className="w-full h-full object-cover rounded-l-lg"
          />
        </div>

        {/* Book Details */}
        <div className="w-full md:w-2/3 p-6">
          <h1 className="text-3xl font-semibold mb-2">{book.name}</h1>
          <p className="text-lg text-gray-600 mb-2">
            Author: {book.authorName}
          </p>
          <p className="text-lg text-gray-600 mb-2">
            Category: {book.category}
          </p>
          <p className="text-lg text-gray-600 mb-2">
            Quantity: {book.quantity}
          </p>
          <ReactStars
            count={5}
            value={book.rating || 0}
            edit={false}
            size={24}
          />
          <button
            className="btn bg-primary hover:bg-secondary text-white py-2 px-4 rounded-md mt-4"
            disabled={book.quantity <= 0}
            onClick={handleBorrow}
          >
            Borrow
          </button>
        </div>
      </div>

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
