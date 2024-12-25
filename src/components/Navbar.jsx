import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false); // Close the menu after logout
    } catch (error) {
      console.error('Logout failed:', error);
      alert('An error occurred while logging out. Please try again.');
    }
  };

  return (
    <div className="navbar border-b-2 border-primary">
      {/* Navbar Start */}
      <div className="navbar-start flex items-center gap-4">
        <NavLink to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-12" />
        </NavLink>
      </div>

      {/* Navbar Center (Desktop NavLinks) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'px-4 py-2 text-lg font-bold text-primary'
                  : 'px-4 py-2 text-lg font-semibold hover:text-secondary'
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/allbooks"
              className={({ isActive }) =>
                isActive
                  ? 'px-4 py-2 text-lg font-bold text-primary'
                  : 'px-4 py-2 text-lg font-semibold hover:text-secondary'
              }
            >
              All Books
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/addbook"
              className={({ isActive }) =>
                isActive
                  ? 'px-4 py-2 text-lg font-bold text-textPrimary'
                  : 'px-4 py-2 text-lg font-semibold hover:text-secondary'
              }
            >
              Add Book
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/borrowedbooks"
              className={({ isActive }) =>
                isActive
                  ? 'px-4 py-2 text-lg font-bold text-primary'
                  : 'px-4 py-2 text-lg font-semibold hover:text-secondary'
              }
            >
              Borrowed Books
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center gap-2">
        {/* User Avatar */}
        {user && user.photoURL && (
          <div className="relative hidden lg:block">
            <div className="w-12 h-12 border-2 border-secondary rounded-full">
              <img
                className="object-cover w-full rounded-full"
                src={user.photoURL}
                alt="User Avatar"
              />
            </div>
          </div>
        )}

        {/* Login/Register/Logout Button */}
        {user && user.email ? (
          <button
            onClick={handleLogout}
            className="btn bg-error text-white hover:bg-primary px-6 py-2 rounded hidden lg:block"
          >
            Log-Out
          </button>
        ) : (
          <>
            <Link
              to="/signin"
              className="px-6 py-2 bg-secondary text-white hover:bg-primary rounded hidden lg:block"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-2 bg-primary text-white hover:bg-secondary rounded hidden lg:block"
            >
              Register
            </Link>
          </>
        )}

        {/* Mobile Dropdown */}
        <div className="dropdown lg:hidden">
          <button className="btn btn-ghost" onClick={toggleMenu}>
            {/* Show avatar or hamburger icon based on user authentication */}
            {user && user.photoURL ? (
              <div className="w-12 h-12 border-2 border-secondary rounded-full">
                <img
                  className="object-cover w-full rounded-full"
                  src={user.photoURL}
                  alt="User Avatar"
                />
              </div>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            )}
          </button>

          {isOpen && (
            <ul
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[50] mt-3 w-52 p-2 shadow right-0"
              onClick={() => setIsOpen(false)}
            >
              <li>
                <NavLink to="/" className="block px-4 py-2">
                  Home
                </NavLink>
              </li>
              {user && (
                <>
                  <li>
                    <NavLink to="/allbooks" className="block px-4 py-2">
                      All Books
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/addbook" className="block px-4 py-2">
                      Add Book
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/borrowedbooks" className="block px-4 py-2">
                      Borrowed Books
                    </NavLink>
                  </li>
                </>
              )}
              {user && user.email ? (
                <button
                  onClick={handleLogout}
                  className="btn bg-error text-white w-full mt-4"
                >
                  Log-Out
                </button>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="btn bg-secondary text-white w-full mt-4"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn bg-primary text-white w-full mt-4"
                  >
                    Register
                  </Link>
                </>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
