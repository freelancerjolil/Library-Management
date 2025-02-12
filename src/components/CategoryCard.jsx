import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  const defaultImage = 'path/to/default/image.jpg'; // Default image in case the category doesn't have one
  const image = category?.image || defaultImage;

  return (
    <div className="category-card border rounded-lg overflow-hidden shadow-lg p-4 hover:scale-105 hover:shadow-2xl transform transition-all duration-300">
      <Link to={`/category/${category.name}`} className="block">
        {/* Category Image */}
        <img
          src={image}
          alt={category.name}
          className="w-full h-48 object-cover rounded-lg"
          loading="lazy"
        />

        {/* Category Name */}
        <h3 className="text-2xl font-semibold mt-4 text-primary hover:text-accent transition-colors duration-200">
          {category.name}
        </h3>

        {/* Category Description */}
        <p className="text-sm mt-2 text-gray-700 line-clamp-2">
          {category.description}
        </p>
      </Link>
    </div>
  );
};

export default CategoryCard;
