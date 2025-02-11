import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

const suggestions = [
  {
    title: 'Return Home',
    description: 'Head back to the homepage to explore more.',
    link: '/',
    icon: '🏠',
  },
  {
    title: 'Search Books',
    description: 'Find books in our collection quickly.',
    link: '/allbooks',
    icon: '📚',
  },
  {
    title: 'Contact Us',
    description: 'Reach out for assistance or queries.',
    link: '/contact',
    icon: '✉️',
  },
];

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#134479] to-[#1e9dcb] text-white">
      <motion.div
        className="text-center space-y-6 p-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-9xl font-bold">404</h1>
        <p className="text-2xl">
          Oops! The page you’re looking for doesn’t exist.
        </p>
      </motion.div>

      <motion.div
        className="w-full max-w-4xl px-4 mt-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
          }}
          loop={true}
          className="pb-8"
        >
          {suggestions.map((item, index) => (
            <SwiperSlide key={index}>
              <motion.div
                className="bg-white text-[#134479] rounded-lg shadow-md p-6 space-y-4 hover:shadow-lg transition-shadow transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl">{item.icon}</div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
                <button
                  onClick={() => handleNavigate(item.link)}
                  className="mt-4 bg-[#21B1E6] text-white font-medium py-2 px-4 rounded hover:bg-[#1e9dcb] transition"
                >
                  Explore
                </button>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
