import {
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithPopup,
} from 'firebase/auth'; // Firebase authentication imports
import { useContext, useRef, useState } from 'react';
import { FcGoogle } from 'react-icons/fc'; // Google icon for sign-in
import { HiEye, HiEyeOff } from 'react-icons/hi'; // Password visibility icons
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // For showing toast notifications
import { AuthContext } from '../context/AuthContext'; // Custom AuthContext for managing user state

const Login = () => {
  const { userLogin, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const emailRef = useRef();

  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const signInWithGoogle = () => {
    setLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success(`Welcome, ${user.displayName || 'User'}!`);
        navigate(location?.state ? location.state : '/');
      })
      .catch((error) => {
        console.error('Google Sign-In Error:', error.message);
        toast.error('Google Sign-In failed. Please try again.');
      })
      .finally(() => setLoading(false));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      toast.error('Email and Password are required.');
      setLoading(false);
      return;
    }

    if (!emailValidation.test(email)) {
      toast.error('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    userLogin(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success('Login Successful!');
        navigate(location?.state ? location.state : '/');
      })
      .catch((error) => {
        console.error('Login Error:', error.message);
        toast.error(
          error.code === 'auth/wrong-password'
            ? 'Incorrect password. Please try again.'
            : error.code === 'auth/user-not-found'
            ? 'No account found with this email.'
            : 'Failed to login. Please check your credentials.'
        );
      })
      .finally(() => setLoading(false));
  };

  const handleForgetPassword = () => {
    const email = emailRef.current.value;

    if (!email || !emailValidation.test(email)) {
      toast.error('Please enter a valid email address!');
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success('Password reset email sent! Check your inbox.');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/user-not-found') {
          toast.error('No user found with this email address.');
        } else if (errorCode === 'auth/invalid-email') {
          toast.error('Invalid email address format.');
        } else {
          toast.error(`Error: ${errorMessage}`);
        }
      });
  };

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const togglePasswordVisibility = () =>
    setShowPassword((prevState) => !prevState);

  return (
    <div className="h-full bg-neutral flex justify-center items-center py-4 lg:py-10">
      <div className="card bg-white shadow-sm w-full lg:w-1/3 max-w-md p-8 rounded-lg">
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-primary mt-4">
            Welcome to EduShelf
          </h2>
        </div>

        {/* Google Sign-In Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={signInWithGoogle}
            className="btn w-full h-12 bg-base-100 border hover:bg-secondary flex items-center justify-center py-2"
            disabled={loading}
          >
            <FcGoogle className="mr-2" size={20} />
            {loading ? 'Signing In...' : 'Sign In with Google'}
          </button>
        </div>

        {/* Separator */}
        <div className="flex items-center my-4">
          <hr className="w-full border-t border-secondary" />
          <span className="mx-2 text-textPrimary">or </span>
          <hr className="w-full border-t border-secondary" />
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control mb-4">
            <label className="label" htmlFor="email">
              <span className="label-text text-primary">Email Address</span>
            </label>
            <input
              id="email"
              name="email"
              ref={emailRef}
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control mb-4">
            <label className="label" htmlFor="password">
              <span className="label-text text-primary">Password</span>
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                className="input input-bordered w-full"
                required
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute text-secondary right-3 top-[30%] transform -translate-y-1/2 cursor-pointer"
                aria-label={showPassword ? 'Hide Password' : 'Show Password'}
              >
                {showPassword ? <HiEyeOff size={24} /> : <HiEye size={24} />}
              </span>
              <div className="flex justify-start items-start pt-2">
                <label onClick={handleForgetPassword} className="label">
                  <a
                    href="#"
                    className="text-error label-text-alt link link-hover"
                  >
                    Forgot password?
                  </a>
                </label>
              </div>
            </div>
          </div>

          <div className="form-control">
            <button
              type="submit"
              className="btn text-textPrimary hover:bg-secondary w-full"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </div>
        </form>

        {/* Register Link */}
        <p className="text-center text-textSecondary mt-4">
          Don't have an account?{' '}
          <Link className="text-primary hover:underline" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
