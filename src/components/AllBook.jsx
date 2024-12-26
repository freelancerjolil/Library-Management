import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AllBook = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [viewMode, setViewMode] = useState('card'); // Default view mode is 'card'
  const [showAvailable, setShowAvailable] = useState(false); // State for filtering available books
  const navigate = useNavigate();

  // Fetch all books when the component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/books', {
          withCredentials: true, // To send cookies (JWT token) with the request
        });
        setBooks(response.data);
        setFilteredBooks(response.data); // Initially, show all books
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  // Handle the toggle view change
  const handleViewChange = (e) => {
    setViewMode(e.target.value);
  };

  // Handle the "Show Available Books" filter toggle
  const handleFilterToggle = () => {
    setShowAvailable((prev) => !prev);
    if (showAvailable) {
      setFilteredBooks(books); // Show all books if filter is off
    } else {
      setFilteredBooks(books.filter((book) => book.quantity > 0)); // Filter books with quantity > 0
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mt-6">
        <h1 className="text-3xl font-bold text-primary mb-4">All Books</h1>

        {/* Show Available Books Filter Button */}
        <button
          onClick={handleFilterToggle}
          className="btn bg-primary hover:bg-secondary text-white mb-4"
        >
          {showAvailable ? 'Show All Books' : 'Show Available Books'}
        </button>

        {/* View Mode Toggle Dropdown */}
        <div className="mb-4">
          <select
            value={viewMode}
            onChange={handleViewChange}
            className="p-2 border border-secondary rounded"
          >
            <option value="card">Card View</option>
            <option value="table">Table View</option>
          </select>
        </div>
      </div>

      {/* Conditional Rendering for Card View and Table View */}
      {viewMode === 'card' ? (
        // Card View
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredBooks.map((book) => (
            <div
              key={book._id}
              className="border rounded-lg p-4 flex flex-col justify-between"
            >
              <div>
                <img
                  src={book.image}
                  alt={book.name}
                  className="w-full rounded-lg h-64 object-cover mb-4"
                />
                <h2 className="text-xl font-semibold">{book.name}</h2>
                <p className="text-sm">Author: {book.authorName}</p>
                <p className="text-sm">Category: {book.category}</p>
                <p className="text-sm">Rating: {book.rating}</p>
                <p className="text-sm">Quantity: {book.quantity}</p>
              </div>
              <Link
                to={`/update-book/${book._id}`}
                className="btn w-full bg-secondary hover:bg-primary mt-4 self-end"
              >
                Update
              </Link>
            </div>
          ))}
        </div>
      ) : (
        // Table View
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-secondary">
            <tr className="bg-gray-200">
              <th className="border px-4 py-2 text-center">Cover</th>
              <th className="border px-4 py-2 text-center">Title</th>
              <th className="border px-4 py-2 text-center">Author</th>
              <th className="border px-4 py-2 text-center">Category</th>
              <th className="border px-4 py-2 text-center">Rating</th>
              <th className="border px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book._id}>
                <td className="border px-4 py-2 text-center">
                  <img
                    src={book.image}
                    alt={book.name}
                    className="w-20 h-20 object-cover mx-auto"
                  />
                </td>
                <td className="border px-4 py-2 text-center">{book.name}</td>
                <td className="border px-4 py-2 text-center">
                  {book.authorName}
                </td>
                <td className="border px-4 py-2 text-center">
                  {book.category}
                </td>
                <td className="border px-4 py-2 text-center">{book.rating}</td>
                <td className="border px-4 py-2 text-center">
                  <Link
                    to={`/update-book/${book._id}`}
                    className="btn bg-secondary hover:bg-primary px-4 py-2 rounded text-textPrimary"
                  >
                    Update
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllBook;
