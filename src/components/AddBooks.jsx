import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext'; // Import useAuth to get the user token

const AddBooks = () => {
  const { getUserToken } = useAuth(); // Access the JWT token
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Handle loading state

  const handleAddBook = async (e) => {
    e.preventDefault();

    // Extract data from the form
    const form = e.target;
    const books = {
      image: form.image.value,
      name: form.name.value,
      quantity: parseInt(form.quantity.value, 10),
      authorName: form.authorName.value,
      category: form.category.value,
      rating: parseFloat(form.rating.value),
      description: form.description.value,
    };

    // Get the JWT token for authentication
    const token = await getUserToken();

    if (!token) {
      Swal.fire('Error', 'You are not authorized. Please log in.', 'error');
      return;
    }

    setLoading(true);

    // Make the API request to add the book
    axios
      .post(
        'https://library-management-server-theta-eight.vercel.app/books',
        books,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        Swal.fire('Success', 'Book added successfully!', 'success');
        navigate('/allbooks'); // Redirect to the books list page
      })
      .catch((error) => {
        Swal.fire(
          'Error',
          error.response?.data?.message || 'Something went wrong.',
          'error'
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container mx-auto p-4 lg:p-0">
      <div className="text-center lg:p-4">
        <h1 className="text-3xl font-bold text-textPrimary">Add Book</h1>
        <p className="py-2">Fill out the form below to add new book details.</p>
      </div>
      <div className="card bg-base-100 w-full shrink-0">
        <form onSubmit={handleAddBook} className="card-body">
          {/* Form fields */}
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Book Image URL</span>
              </label>
              <input
                type="url"
                name="image"
                placeholder="Image URL"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Book Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Title of the book"
                className="input input-bordered"
                required
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Quantity</span>
              </label>
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Author Name</span>
              </label>
              <input
                type="text"
                name="authorName"
                placeholder="Author Name"
                className="input input-bordered"
                required
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select name="category" className="input input-bordered" required>
                <option value="Novel">Novel</option>
                <option value="Thriller">Thriller</option>
                <option value="History">History</option>
                <option value="Drama">Drama</option>
                <option value="Sci-Fi">Sci-Fi</option>
              </select>
            </div>
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Rating (1-5)</span>
              </label>
              <input
                type="number"
                name="rating"
                placeholder="1 - 5"
                min="1"
                max="5"
                step="0.1"
                className="input input-bordered"
                required
              />
            </div>
          </div>
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Short Description</span>
            </label>
            <textarea
              name="description"
              placeholder="Short Description"
              className="textarea textarea-bordered textarea-md w-full"
              required
            ></textarea>
          </div>
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
      <div className="my-8 ">
        <h2 className="text-xl font-semibold text-center">
          About Adding Books
        </h2>
        <p className="text-sm w-8/12 text-gray-600 text-center items-center mx-auto">
          This page allows you to add new books to the library database. Ensure
          that all information provided is accurate. Once added, the book will
          be available for borrowing and browsing within the system.
        </p>
      </div>
    </div>
  );
};

export default AddBooks;
