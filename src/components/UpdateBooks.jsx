import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBooks = () => {
  const { id } = useParams(); // Get the book id from the URL params
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  console.log(id);

  const [book, setBook] = useState({
    image: '',
    name: '',
    authorName: '',
    category: '',
    rating: 1,
  });

  const [categories] = useState([
    'Novel',
    'Drama',
    'History',
    'Thriller',
    'Sci-Fi',
  ]); // Static categories

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/books/${id}`, {
          withCredentials: true,
        });
        setBook(response.data); // Make sure response.data is structured as expected
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBook();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevState) => ({
      ...prevState,
      [name]: value, // Dynamically update the book object
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(`http://localhost:5000/books/${id}`, book, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json', // Sending JSON data
        },
      });
      navigate('/allbooks'); // Redirect after update
    } catch (error) {
      console.error('Error updating book:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Update Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold">Book Image</label>
          <input
            type="url"
            name="image"
            value={book.image || ''} // Make sure it's an empty string if undefined
            onChange={handleChange}
            className="mt-2 p-2 w-full border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Title</label>
          <input
            type="text"
            name="name"
            value={book.name || ''} // Ensure it's an empty string if undefined
            onChange={handleChange}
            className="mt-2 p-2 w-full border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Author Name</label>
          <input
            type="text"
            name="authorName"
            value={book.authorName || ''} // Ensure it's an empty string if undefined
            onChange={handleChange}
            className="mt-2 p-2 w-full border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Category</label>
          <select
            name="category"
            value={book.category || ''} // Ensure it's an empty string if undefined
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
        <div>
          <label className="block text-sm font-semibold">Rating</label>
          <input
            type="number"
            name="rating"
            value={book.rating || 1} // Default to 1 if undefined
            onChange={handleChange}
            min="1"
            max="5"
            className="mt-2 p-2 w-full border rounded"
          />
        </div>
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
