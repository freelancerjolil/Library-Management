import { motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <div className="py-12 px-4 bg-gradient-to-r from-primary to-secondary text-base-100 text-center">
      <motion.h2
        className="text-3xl font-bold"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Join Our Library Today!
      </motion.h2>
      <motion.p
        className="mt-4 text-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        Become a member and unlock access to thousands of books.
      </motion.p>
      <motion.button
        className="mt-6 px-8 py-3 bg-accent text-neutral font-bold rounded-md shadow-lg hover:shadow-xl hover:bg-warning transition"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
      >
        <Link to="/register">Get Started</Link>
      </motion.button>
    </div>
  );
};

export default CallToAction;
