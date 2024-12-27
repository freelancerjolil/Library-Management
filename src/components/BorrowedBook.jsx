import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axios/axiosInstance';

const BorrowedBook = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors
  const navigate = useNavigate();

  // Fetch borrowed books when the component mounts
  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const response = await axiosInstance.get('/borrow');
        console.log(response.data);
        setBorrowedBooks(response.data);
      } catch (error) {
        setError('Error fetching borrowed books');
        console.error('Error fetching borrowed books:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBorrowedBooks();
  }, []);

  // Handle book return
  const handleReturn = async (borrowedBookId) => {
    try {
      // Call the backend API to return the book
      await axiosInstance.put(
        `/return/${borrowedBookId}`,
        {},
        { withCredentials: true }
      );

      // Update local state by removing the returned book
      setBorrowedBooks((prevBooks) =>
        prevBooks.filter((book) => book._id !== borrowedBookId)
      );
    } catch (error) {
      console.error('Error returning the book:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Loading spinner or message
  }

  if (error) {
    return <div>{error}</div>; // Display error message if API call fails
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mt-4 text-center">Borrowed Books</h1>

      {/* Display borrowed books */}
      {borrowedBooks.length === 0 ? (
        <p className="text-center">You have no borrowed books.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {borrowedBooks.map((borrowedBook) => (
            <div key={borrowedBook._id} className="border rounded-lg p-4">
              {/* Ensure borrowedBook.book contains the image, name, and category */}
              <img
                src={borrowedBooks.book?.image} // Optional chaining to avoid errors
                alt={borrowedBooks.book?.name}
                className="w-full h-64 object-cover mb-4"
              />
              <h2 className="text-xl font-semibold">
                {borrowedBook.book?.name}
              </h2>
              <p className="text-sm">Category: {borrowedBook.book?.category}</p>
              <p className="text-sm">
                Borrowed Date:{' '}
                {new Date(borrowedBook.borrowedAt).toLocaleDateString()}
              </p>
              <p className="text-sm">
                Return Date:{' '}
                {new Date(borrowedBook.returnDate).toLocaleDateString()}
              </p>

              {/* Return Book Button */}
              <button
                onClick={() => handleReturn(borrowedBook._id)}
                className="btn btn-primary mt-4"
              >
                Return
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BorrowedBook;
