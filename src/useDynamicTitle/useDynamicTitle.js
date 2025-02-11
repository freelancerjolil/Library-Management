// src/hooks/useDynamicTitle.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useDynamicTitle = () => {
  const location = useLocation(); // Get the current location object (route)

  useEffect(() => {
    // Map routes to their respective page titles
    const titles = {
      '/': 'Home - Library Management System',
      '/allbooks': 'All Books - Library Management System',
      '/addbook': 'Add Book - Library Management System',
      '/update-book/:id': 'Update Book - Library Management System',
      '/category': 'Categories - Library Management System',
      '/category/:category': 'Books by Category - Library Management System',
      '/book/:id': 'Book Details - Library Management System',
      '/borrowedbooks': 'Borrowed Books - Library Management System',
      '/signin': 'Sign In - Library Management System',
      '/register': 'Register - Library Management System',
      // Add any additional routes as needed
    };

    // Set the title based on the current route
    const currentTitle =
      titles[location.pathname] || 'Library Management System'; // Default title if route not found
    document.title = currentTitle;
  }, [location]); // Re-run on route change
};

export default useDynamicTitle;
