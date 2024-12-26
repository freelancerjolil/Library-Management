import { createBrowserRouter } from 'react-router-dom';
import AddBooks from '../components/AddBooks';
import BookCategories from '../components/BookCategories';
import BooksByCategory from '../components/BooksByCategory';
import UpdateBooks from '../components/UpdateBooks';
import MainLayout from '../layouts/MainLayout';
import AddBook from '../pages/AddBook';
import AllBooks from '../pages/AllBooks';
import BookDetails from '../pages/BookDetails';
import BorrowedBooks from '../pages/BorrowedBooks';
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
        element: <Home></Home>,
      },

      {
        path: '/allbooks',
        element: (
          <ProtectedRoute>
            <AllBooks></AllBooks>
          </ProtectedRoute>
        ),
        // loader: () =>
        //   handleFetchError(fetch(`${API_URL}/books?page=0&size=10`)),
      },
      {
        path: '/books',
        element: (
          <ProtectedRoute>
            <AddBooks></AddBooks>
          </ProtectedRoute>
        ),
      },

      {
        path: '/update-book/:id',
        element: (
          <ProtectedRoute>
            <UpdateBooks></UpdateBooks>
          </ProtectedRoute>
        ),
      },

      {
        path: '/category',
        element: <BookCategories></BookCategories>,
      },

      {
        path: '/category/:category',
        element: <BooksByCategory></BooksByCategory>,
      },

      {
        path: '/book/:id',
        element: (
          <ProtectedRoute>
            <BookDetails></BookDetails>
          </ProtectedRoute>
        ),
      },

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
        element: (
          <ProtectedRoute>
            <BorrowedBooks></BorrowedBooks>
          </ProtectedRoute>
        ),
      },

      {
        path: '/register',
        element: <Register></Register>,
      },
      {
        path: '/signin',
        element: <Login></Login>,
      },

      //   {
      //     path: '*',
      //     element: <ErrorPage></ErrorPage>,
      //   },
    ],
  },
]);

export default router;
