import React, { useEffect, useState } from 'react';
import ReactStars from 'react-rating-stars-component'; // Import react-rating-stars-component for the rating
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import Modal from './Modal'; // Assuming Modal is a separate component for handling the borrow form

const BookDetails = () => {
  const { user } = useAuth(); // Assuming useAuth context gives you the user object
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [returnDate, setReturnDate] = useState('');

  useEffect(() => {
    // Fetch book details based on book ID
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/books/${id}`);
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error('Error fetching book details', error);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleBorrow = () => {
    if (!user) {
      // If user is not logged in, redirect to login page
      navigate('/signin');
      return;
    }

    if (book.quantity <= 0) {
      toast.error('This book is currently out of stock.');
      return;
    }

    setModalOpen(true);
  };

  const handleSubmitBorrow = async (e) => {
    e.preventDefault();

    if (!returnDate) {
      toast.error('Please select a return date.');
      return;
    }

    const borrowData = {
      bookId: book._id,
      userId: user.id,
      returnDate,
    };

    try {
      // Call API to borrow the book (decrement quantity and add to borrowed list)
      const response = await fetch(`http://localhost:5000/borrow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(borrowData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Book borrowed successfully!');
        setModalOpen(false);
        setReturnDate('');
      } else {
        toast.error('Failed to borrow book.');
      }
    } catch (error) {
      console.error('Error borrowing book', error);
      toast.error('Error occurred while borrowing the book.');
    }
  };

  if (!book) {
    return <div>Loading...</div>;
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
          <div className="flex items-center mb-4">
            <span className="mr-2">Rating:</span>
            <ReactStars count={5} value={book.rating} edit={false} size={24} />
          </div>

          <button
            className="btn bg-primary hover:bg-secondary text-white py-2 px-4 rounded-md"
            disabled={book.quantity <= 0}
            onClick={handleBorrow}
          >
            Borrow
          </button>
        </div>
      </div>

      {/* Modal for Borrowing the Book */}
      {isModalOpen && (
        <Modal>
          <form
            onSubmit={handleSubmitBorrow}
            className="p-6 bg-white rounded shadow-lg"
          >
            <div className="mb-4">
              <label className="block text-sm">Name</label>
              <input
                type="text"
                value={user.displayName}
                disabled
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm">Email</label>
              <input
                type="email"
                value={user.email}
                disabled
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm">Return Date</label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                required
                className="border p-2 w-full"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="btn bg-secondary hover:bg-primary text-white py-2 px-4 rounded-md"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="btn bg-gray-500 hover:bg-gray-400 text-white py-2 px-4 rounded-md"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default BookDetails;
