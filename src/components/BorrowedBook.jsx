import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axios/axiosInstance';

const BorrowedBook = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch borrowed books
  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const response = await axiosInstance.get('/borrow', {
          withCredentials: true,
        });

        // Fetch book details for each borrowed book
        const booksWithDetails = await Promise.all(
          response.data.map(async (borrowedBook) => {
            const bookResponse = await axiosInstance.get(
              `/books/${borrowedBook.bookId}`
            );
            return { ...borrowedBook, book: bookResponse.data };
          })
        );

        setBorrowedBooks(booksWithDetails);
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
      await axiosInstance.put(
        `/return/${borrowedBookId}`,
        {},
        { withCredentials: true }
      );

      // Remove the returned book from UI
      setBorrowedBooks((prevBooks) =>
        prevBooks.filter((book) => book._id !== borrowedBookId)
      );
    } catch (error) {
      console.error('Error returning the book:', error);
    }
  };

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mt-4 text-center">Borrowed Books</h1>

      {borrowedBooks.length === 0 ? (
        <p className="text-center mt-4 text-gray-600">
          You have no borrowed books.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {borrowedBooks.map((borrowedBook) => (
            <div
              key={borrowedBook._id}
              className="bg-white shadow-md rounded-lg p-4"
            >
              <img
                src={
                  borrowedBook.book?.image || 'https://via.placeholder.com/150'
                }
                alt={borrowedBook.book?.name}
                className="w-full h-64 object-cover rounded-md"
              />
              <h2 className="text-xl font-semibold mt-2">
                {borrowedBook.book?.name}
              </h2>
              <p className="text-sm text-gray-600">
                Category: {borrowedBook.book?.category}
              </p>
              <p className="text-sm text-gray-600">
                Borrowed Date:{' '}
                {new Date(borrowedBook.borrowedAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">
                Return Date:{' '}
                {new Date(borrowedBook.returnDate).toLocaleDateString()}
              </p>

              <button
                onClick={() => handleReturn(borrowedBook._id)}
                className="bg-red-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-red-600 transition"
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
