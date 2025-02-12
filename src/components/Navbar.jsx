import { useContext, useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import avatarImg from '../assets/placeholder.jpg';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = async () => {
    try {
      await logout();
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getActiveLinkClass = ({ isActive }) =>
    isActive
      ? 'text-primary border-b-2 border-primary bg-gray-100' // Active link
      : 'hover:text-primary'; // Inactive link

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isMenuOpen && !e.target.closest('.menu-container')) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isMenuOpen]);

  return (
    <nav className="sticky top-0 w-full z-10 bg-opacity-30 backdrop-blur-lg bg-gradient-to-r from-neutral to-neutral/30 border-b border-borderLight">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-10" />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8 text-textPrimary font-heading">
          <NavLink to="/" className={getActiveLinkClass}>
            Home
          </NavLink>
          <NavLink to="/allbooks" className={getActiveLinkClass}>
            All Books
          </NavLink>
          <NavLink to="/addbook" className={getActiveLinkClass}>
            Add Book
          </NavLink>
          <NavLink to="/borrowedbooks" className={getActiveLinkClass}>
            Borrowed Books
          </NavLink>
          {user && (
            <NavLink to="/dashboard" className={getActiveLinkClass}>
              Dashboard
            </NavLink>
          )}
        </div>

        {/* User Profile or Login/Sign-up */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-primary text-surface rounded-lg hover:bg-accent"
              >
                Log Out
              </button>

              <img
                src={user?.photoURL || avatarImg}
                alt={user?.displayName || 'User Avatar'}
                className="h-10 w-10 rounded-full border border-textPrimary cursor-pointer"
                onClick={toggleMenu}
              />
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-surface"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-primary text-surface rounded-lg hover:bg-accent"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Menu Button (Mobile View) */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-2xl text-textPrimary focus:outline-none"
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="menu-container md:hidden bg-surface shadow-md">
          <div className="p-4 space-y-4 text-textPrimary font-heading">
            <NavLink
              to="/"
              className="block px-4 py-2 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/allbooks"
              className="block px-4 py-2 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              All Books
            </NavLink>
            <NavLink
              to="/addbook"
              className="block px-4 py-2 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Add Book
            </NavLink>
            <NavLink
              to="/borrowedbooks"
              className="block px-4 py-2 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Borrowed Books
            </NavLink>
            {user && (
              <NavLink
                to="/dashboard"
                className="block px-4 py-2 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </NavLink>
            )}
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 bg-primary text-surface rounded-lg hover:bg-accent"
              >
                Log Out
              </button>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="block px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-surface"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 bg-primary text-surface rounded-lg hover:bg-accent"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
