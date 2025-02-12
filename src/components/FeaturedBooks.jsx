import { motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';

const books = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    image: 'https://i.ibb.co.com/wBgFyVq/81-Nqn1-LNGDL-AC-UF894-1000-QL80.jpg',
    rating: 4.5,
  },
  {
    id: 2,
    title: '1984',
    author: 'George Orwell',
    image: 'https://i.ibb.co.com/hHGvNQr/91w5qaul-Wm-L-UF1000-1000-QL80.jpg',
    rating: 4.7,
  },
  {
    id: 3,
    title: 'The Broken Vow',
    author: 'Yuval Noah Harari',
    image:
      'https://i.ibb.co.com/5BTH5pk/71-Zkl-Wwo-QPL-AC-UF1000-1000-QL80.jpghttps://i.ibb.co.com/5BTH5pk/71-Zkl-Wwo-QPL-AC-UF1000-1000-QL80.jpg',
    rating: 4.9,
  },
  {
    id: 4,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    image: 'https://i.ibb.co.com/XsjkXcc/71-Nvk-Zxn-f-L-SL1360.jpg',
    rating: 4.9,
  },
  {
    id: 5,
    title: 'Dune',
    author: 'Frank Herbert',
    image: 'https://i.ibb.co.com/Jt50h6f/81v-Jyslg3q-L-UF1000-1000-QL80.jpg',
    rating: 4.9,
  },
  {
    id: 6,
    title: 'The Family Secret',
    author: 'J.D. Salinger',
    image: 'https://i.ibb.co.com/Cvc5bHV/8123m-Osk1-QL-UF1000-1000-QL80.jp.jpg',
    rating: 4.2,
  },
];

const FeaturedBooks = () => {
  return (
    <div className="py-12 bg-neutral">
      <h2 className="text-3xl font-bold text-center text-primary">
        Featured Books
      </h2>
      <p className="text-center text-secondary mt-2">
        Explore our top-rated books selected just for you.
      </p>
      <div className="mt-8 flex overflow-x-scroll gap-6 px-4 scrollbar-hide">
        {books.map((book, index) => (
          <motion.div
            key={book.id}
            className="bg-base-100 rounded-lg shadow-md p-4 min-w-[250px] hover:shadow-2xl transform transition-shadow"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-40 object-cover rounded-t-lg"
              loading="lazy"
            />
            <div className="mt-4 p-2 bg-white bg-opacity-80 rounded-b-lg">
              <h3 className="text-xl font-semibold text-primary">
                {book.title}
              </h3>
              <p className="text-secondary">by {book.author}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-accent font-bold">⭐ {book.rating}</span>
                <p className="text-info text-sm">Rating</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View More Button */}
      <div className="text-center mt-8">
        <Link
          to="/allbooks"
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-accent transition-colors"
        >
          View More
        </Link>
      </div>
    </div>
  );
};

export default FeaturedBooks;
