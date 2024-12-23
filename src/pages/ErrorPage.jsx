import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#134479] text-white">
      <div className="text-center p-10">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-6">
          Oops! The page you are looking for cannot be found.
        </p>
        <button
          onClick={handleGoHome}
          className="btn bg-[#21B1E6] text-[#134479] hover:bg-[#1e9dcb] font-semibold py-2 px-6 rounded"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
