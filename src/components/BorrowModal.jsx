import axios from 'axios';
import React, { useState } from 'react';

const BorrowModal = ({ book, closeModal }) => {
  const [returnDate, setReturnDate] = useState('');

  const handleSubmit = async () => {
    try {
      await axios.put(`/borrow/${book._id}`, { returnDate });
      closeModal();
    } catch (error) {
      console.error('Error borrowing the book:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Borrow {book.title}</h2>
        <label>Return Date</label>
        <input
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
        />
        <button onClick={handleSubmit}>Borrow</button>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default BorrowModal;
