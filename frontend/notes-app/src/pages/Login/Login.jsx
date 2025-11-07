import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import PasswordInput from '../../components/Input/PasswordInput';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email.trim())) {
      setError('Please enter a valid email address');
      return;
    }

    if (!password.trim()) {
      setError('Please enter a password');
      return;
    }

    setError('');

    try {
      const response = await axiosInstance.post('/login', {
        email: email.trim(),
        password: password.trim(),
      });

      if (response.data?.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(
        error.response?.data?.message ||
          'An unexpected error has occurred. Please try again!'
      );
    }
  };

  return (
    <>
      <Navbar />

      {/* Background gradient */}
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[300px] sm:w-[450px] md:w-[600px] h-[300px] sm:h-[450px] md:h-[600px] bg-blue-300/30 rounded-full blur-[120px] pointer-events-none" />

        {/* Card container */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-sm sm:max-w-md px-4"
        >
          <div className="rounded-2xl bg-white/80 backdrop-blur-xl border border-blue-100 shadow-md sm:shadow-lg px-5 sm:px-7 py-8 sm:py-10">
            <form onSubmit={handleLogin}>
              {/* Heading */}
              <h4 className="text-2xl sm:text-3xl font-semibold text-center mb-6 text-blue-700">
                Welcome Back
              </h4>

              {/* Email input */}
              <input
                type="text"
                placeholder="Email"
                className="w-full text-sm sm:text-base bg-white/70 border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 px-4 py-3 sm:py-3.5 rounded-lg mb-4 outline-none transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* Password input */}
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              {/* Error */}
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm mt-2"
                >
                  {error}
                </motion.p>
              )}

              {/* Button */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.02 }}
                type="submit"
                className="w-full mt-6 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white py-3 rounded-lg text-sm sm:text-base font-medium shadow-md hover:shadow-lg transition-all"
              >
                Login
              </motion.button>

              {/* Footer link */}
              <p className="text-sm sm:text-base text-center mt-5 text-gray-600">
                Not registered yet?{' '}
                <Link
                  to="/signup"
                  className="text-blue-700 font-medium hover:underline"
                >
                  Create Account
                </Link>
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Login;
