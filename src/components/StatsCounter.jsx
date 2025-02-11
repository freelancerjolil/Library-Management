import { motion } from 'framer-motion';
import React from 'react';

const stats = [
  { id: 1, label: 'Books Available', value: '10,000+' },
  { id: 2, label: 'Active Members', value: '5,000+' },
  { id: 3, label: 'Books Borrowed', value: '20,000+' },
];

const StatsCounter = () => {
  return (
    <div className="py-12 p-4 bg-neutral text-primary text-center">
      <h2 className="text-3xl font-bold">Our Achievements</h2>
      <div className="mt-8 flex flex-col md:flex-row justify-center gap-12">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id}
            className="bg-base-100 p-6 rounded-lg shadow-md hover:shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.1 }}
          >
            <h3 className="text-4xl font-bold text-accent">{stat.value}</h3>
            <p className="text-lg text-secondary mt-2">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StatsCounter;
