import React, { useEffect, useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../axios/axiosInstance';

const UpdateBooks = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [book, setBook] = useState({
    image: '',
    name: '',
    authorName: '',
    category: '',
    rating: 1,
  });
  const [categories] = useState([
    // Static categories (if needed dynamically, fetch from API)
    'Novel',
    'Drama',
    'History',
    'Thriller',
    'Sci-Fi',
  ]);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        // Fetch book data based on the ID
        const response = await axios.get(
          `https://library-management-server-theta-eight.vercel.app/books/${id}`,
          { withCredentials: true }
        );
        setBook(response.data); // Set the book data in state
      } catch (error) {
        console.error('Error fetching book details:', error);
        setError('Failed to fetch book details');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!book.name || !book.authorName || !book.image || !book.category) {
      setError('All fields are required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    try {
      // Make PUT request to update the book
      await axios.put(
        `https://library-management-server-theta-eight.vercel.app/books/${id}`,
        book,
        { withCredentials: true }
      );
      navigate('/allbooks'); // Redirect to the books list after successful update
    } catch (error) {
      setError('Error updating book');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Update Book</h1>
      {error && <div className="text-red-500">{error}</div>}{' '}
      {/* Display errors */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Image URL Input */}
        <div>
          <label className="block text-sm font-semibold">Book Image</label>
          <input
            type="url"
            name="image"
            value={book.image || ''}
            onChange={handleChange}
            className="mt-2 p-2 w-full border rounded"
          />
        </div>

        {/* Book Title */}
        <div>
          <label className="block text-sm font-semibold">Title</label>
          <input
            type="text"
            name="name"
            value={book.name || ''}
            onChange={handleChange}
            className="mt-2 p-2 w-full border rounded"
          />
        </div>

        {/* Author Name */}
        <div>
          <label className="block text-sm font-semibold">Author Name</label>
          <input
            type="text"
            name="authorName"
            value={book.authorName || ''}
            onChange={handleChange}
            className="mt-2 p-2 w-full border rounded"
          />
        </div>

        {/* Book Category */}
        <div>
          <label className="block text-sm font-semibold">Category</label>
          <select
            name="category"
            value={book.category || ''}
            onChange={handleChange}
            className="mt-2 p-2 w-full border rounded"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Rating */}
        <ReactStars count={5} value={book.rating || 0} edit={false} size={24} />

        {/* Submit Button */}
        <button
          type="submit"
          className="btn w-full btn-primary"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default UpdateBooks;
