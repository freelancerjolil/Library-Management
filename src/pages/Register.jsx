import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  // Context values for authentication
  const { createNewUser, setUser, updateUserProfile } = useContext(AuthContext);

  // State variables for user input and status
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const auth = getAuth();

  // Handle password input and validate its strength
  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);

    const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordValidation.test(passwordValue)) {
      setError(
        'Password must contain at least 1 uppercase letter, 1 lowercase letter, and be at least 6 characters long.'
      );
    } else {
      setError('');
    }

    if (!passwordValue) setError('');
  };

  // Generic handler for input changes and resetting errors
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setError('');
  };

  // Handle form submission for user registration
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prevent submission if there's an error or incomplete input
    if (error || !email || !password || !name || !photo) {
      toast.error('Please check your inputs.', {
        position: 'top-center',
        autoClose: 5000,
        toastId: 'register-error',
      });
      return;
    }

    setLoading(true);

    createNewUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        // Update user profile with name and photo
        return updateUserProfile({
          displayName: name,
          photoURL: photo || 'https://example.com/default-avatar.png', // Use default avatar if none provided
        });
      })
      .then(() => {
        toast.success('Registration successful! Redirecting to Home page.', {
          position: 'top-center',
          autoClose: 3000,
          toastId: 'register-success',
        });
        navigate('/');
      })
      .catch((err) => {
        console.error('Error during registration:', err.message);
        setError('Failed to create account. Please try again.');
        toast.error('Failed to create account. Please try again.', {
          position: 'top-center',
          autoClose: 5000,
          toastId: 'register-fail',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Track authentication state and handle redirects for logged-in users
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) navigate('/'); // Redirect logged-in users
    });
    return () => unSubscribe();
  }, [auth, setUser, navigate]);

  return (
    <div className="h-full lg:min-h-screen bg-[#F7F8FA] flex justify-center items-center">
      <div className="card bg-white shadow-sm w-full max-w-lg p-8 rounded-lg">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold mt-4 text-[#134479]">
            Create Your Account
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-[#134479]">Full Name</span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              className="input input-bordered"
              value={name}
              onChange={handleInputChange(setName)}
              required
            />
          </div>

          {/* Photo URL Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-[#134479]">Photo URL</span>
            </label>
            <input
              name="photo"
              type="text"
              placeholder="Photo URL"
              className="input input-bordered"
              value={photo}
              onChange={handleInputChange(setPhoto)}
              required
            />
          </div>

          {/* Email Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-[#134479]">Email</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="e-mail@mail.com"
              className="input input-bordered"
              value={email}
              onChange={handleInputChange(setEmail)}
              required
            />
          </div>

          {/* Password Input with Toggle Visibility */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-[#134479]">Password</span>
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="input input-bordered w-full"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button
              className="btn bg-[#21B1E6] text-white hover:bg-[#1e9dcb] w-full"
              disabled={
                loading || !name || !email || !password || !photo || !!error
              }
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>

        {/* Link to Login */}
        <p className="text-center mt-4 font-semibold">
          Already Have An Account?{' '}
          <Link to="/signin" className="text-[#21B1E6] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
