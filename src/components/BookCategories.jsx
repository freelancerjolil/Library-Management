import React from 'react';
import { useNavigate } from 'react-router-dom';

// Category data with names and images
const categories = [
  {
    name: 'Nobel',
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
    <div className="container mx-auto my-6">
      <h1 className="text-2xl font-bold mb-8 text-center">
        Explore Book Categories
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="card shadow-lg cursor-pointer"
            onClick={() => navigate(`/category/${category.name}`)}
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-40 object-cover rounded-t"
            />
            <div className="p-4 text-center">
              <h2 className="text-lg font-bold">{category.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookCategories;
