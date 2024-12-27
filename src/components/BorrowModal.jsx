import React, { useState } from 'react';

const BorrowModal = ({ book, isOpen, onClose, onBorrow }) => {
  const [returnDate, setReturnDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!returnDate) {
      setError('Please select a return date.');
      return;
    }
    setError('');
    onBorrow({ returnDate });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-lg font-semibold mb-4">Borrow Book</h2>
        <p className="mb-4">
          You are borrowing: <strong>{book.name}</strong>
        </p>
        <label className="block mb-4 font-medium">
          Select Return Date:
          <input
            type="date"
            className="block w-full border border-gray-300 rounded mt-1 p-2"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
          />
        </label>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="flex justify-end">
          <button
            className="btn bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="btn bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default BorrowModal;
