import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    name: 'Novel',
    image: 'https://i.ibb.co/wBDnR26/466630-booksbymuhammadyunus.jpg',
  },
  { name: 'Drama', image: 'https://i.ibb.co/PjHpjxK/images.jpg' },
  {
    name: 'History',
    image: 'https://i.ibb.co/ZMG8NNh/Screenshot-2024-12-26-082051.png',
  },
  {
    name: 'Thriller',
    image:
      'https://i.ibb.co/3NcPr8h/1-best-thriller-books-index-comp-649d9b68c3157.jpg',
  },
];

const BookCategories = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto py-4 px-6">
      <h2 className="text-3xl font-semibold text-center text-white mb-8">
        Browse Book Categories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            className="cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-105"
            onClick={() => navigate(`/category/${category.name}`)}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
          >
            <div className="relative">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-60 object-cover rounded-t-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#134479] via-transparent to-transparent text-white text-center py-2">
                <h2 className="text-xl font-bold">{category.name}</h2>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BookCategories;
