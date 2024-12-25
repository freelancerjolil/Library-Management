import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BorrowedBook = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const navigate = useNavigate();

  // Fetch borrowed books when the component mounts
  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/borrowed-books',
          {
            withCredentials: true, // To send cookies (JWT token) with the request
          }
        );
        setBorrowedBooks(response.data);
      } catch (error) {
        console.error('Error fetching borrowed books:', error);
      }
    };
    fetchBorrowedBooks();
  }, []);

  // Handle book return
  const handleReturn = async (borrowedBookId, bookId) => {
    try {
      // Call the backend API to return the book
      await axios.put(
        `http://localhost:5000/return/${borrowedBookId}`,
        {},
        { withCredentials: true }
      );

      // Update local state by removing the returned book
      setBorrowedBooks((prevBooks) =>
        prevBooks.filter((book) => book._id !== borrowedBookId)
      );

      // Optionally, you can update the quantity of the book locally or refetch the books
      // This can be done by sending a GET request again to fetch the books.
    } catch (error) {
      console.error('Error returning the book:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mt-4 text-center">Borrowed Books</h1>

      {/* Display borrowed books */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {borrowedBooks.map((borrowedBook) => (
          <div key={borrowedBook._id} className="border rounded-lg p-4">
            <img
              src={borrowedBook.book.image}
              alt={borrowedBook.book.title}
              className="w-full h-64 object-cover mb-4"
            />
            <h2 className="text-xl font-semibold">{borrowedBook.book.title}</h2>
            <p className="text-sm">Category: {borrowedBook.book.category}</p>
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
              onClick={() =>
                handleReturn(borrowedBook._id, borrowedBook.bookId)
              }
              className="btn btn-primary mt-4"
            >
              Return
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BorrowedBook;
