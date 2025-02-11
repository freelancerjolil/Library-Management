import { createBrowserRouter } from 'react-router-dom';
import AddBooks from '../components/AddBooks';
import BookCategories from '../components/BookCategories';
import BooksByCategory from '../components/BooksByCategory';
import BorrowedBook from '../components/BorrowedBook';
import UpdateBooks from '../components/UpdateBooks';
import MainLayout from '../layouts/MainLayout';
import AddBook from '../pages/AddBook';
import AllBooks from '../pages/AllBooks';
import BookDetails from '../pages/BookDetails';
import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <Home></Home>, // Home page with dynamic content
      },

      // **All Books** (Accessible only for authenticated users)
      {
        path: '/allbooks',
        element: (
          <ProtectedRoute>
            <AllBooks></AllBooks>
          </ProtectedRoute>
        ),
        // loader: () => fetchBooks(),  // You can add loader if needed for fetching books data
      },

      // **Add Books** (Only for Admins)
      {
        path: '/addbook',
        element: (
          <ProtectedRoute>
            <AddBooks></AddBooks>
          </ProtectedRoute>
        ),
      },

      // **Update Books** (Only for Admins)
      {
        path: '/update-book/:id',
        element: (
          <ProtectedRoute>
            <UpdateBooks></UpdateBooks>
          </ProtectedRoute>
        ),
      },

      // **Book Categories**
      {
        path: '/category',
        element: <BookCategories></BookCategories>, // List of book categories
      },

      // **Books By Category**
      {
        path: '/category/:category',
        element: <BooksByCategory></BooksByCategory>, // List books by selected category
      },

      // **Book Details** (Protected route for authenticated users)
      {
        path: '/book/:id',
        element: (
          <ProtectedRoute>
            <BookDetails></BookDetails>
          </ProtectedRoute>
        ),
      },

      // **Add Book Page** (for admins to add a new book)
      {
        path: '/addbook',
        element: (
          <ProtectedRoute>
            <AddBook></AddBook>
          </ProtectedRoute>
        ),
      },

      {
        path: '/borrowedbooks',
        element: <BorrowedBook></BorrowedBook>,
      },

      // **Register** (Public route for user registration)
      {
        path: '/register',
        element: <Register></Register>,
      },

      // **Login** (Public route for user login)
      {
        path: '/signin',
        element: <Login></Login>,
      },

      // **404 Page Not Found**

      {
        path: '*',
        element: <ErrorPage></ErrorPage>,
      },
    ],
  },
]);

export default router;
