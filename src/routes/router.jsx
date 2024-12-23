import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AddBook from '../pages/AddBook';
import AllBooks from '../pages/AllBooks';
import BookDetails from '../pages/BookDetails';
import BorrowedBooks from '../pages/BorrowedBooks';
import Categories from '../pages/Categories';
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
        element: <AllBooks></AllBooks>,
        // loader: () =>
        //   handleFetchError(fetch(`${API_URL}/books?page=0&size=10`)),
      },

      {
        path: '/book/:id',
        element: (
          <ProtectedRoute>
            <BookDetails></BookDetails>
          </ProtectedRoute>
        ),
        // loader: ({ params }) =>
        //   handleFetchError(fetch(`${API_URL}/books/${params.id}`)),
      },

      {
        path: '/categories',
        element: <Categories></Categories>,
        // loader: () => handleFetchError(fetch(`${API_URL}/categories`)),
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
        // loader: async () =>
        //   handleFetchError(
        //     fetch(`${API_URL}/borrowed-books`, {
        //       headers: {
        //         Authorization: `Bearer ${localStorage.getItem('token')}`,
        //       },
        //     })
        //   ),
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
