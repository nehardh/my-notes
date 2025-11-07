import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import PasswordInput from '../../components/Input/PasswordInput';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { motion } from 'framer-motion';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

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
      const response = await axiosInstance.post('/create-account', {
        fullName: name.trim(),
        email: email.trim(),
        password: password.trim(),
      });

      if (response.data?.error) {
        setError(response.data.message);
        return;
      }

      if (response.data?.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError(
        error.response?.data?.message ||
          'An unexpected error occurred. Please try again!'
      );
    }
  };

  return (
    <>
      <Navbar />

      {/* Background */}
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 via-white to-blue-100 relative overflow-hidden">
        {/* Glow / texture */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-blue-200/40 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md z-10"
        >
          <div className="rounded-2xl bg-white/80 backdrop-blur-xl border border-blue-100 shadow-lg px-6 sm:px-8 py-8 sm:py-10">
            <form onSubmit={handleSignUp} className="flex flex-col">
              <h4 className="text-3xl font-semibold text-center mb-6 text-blue-700">
                Create Account
              </h4>

              <input
                type="text"
                placeholder="Full Name"
                className="w-full text-sm bg-white/70 border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 px-4 py-3 rounded-lg mb-3 outline-none transition-all"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="text"
                placeholder="Email"
                className="w-full text-sm bg-white/70 border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 px-4 py-3 rounded-lg mb-3 outline-none transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm mt-2"
                >
                  {error}
                </motion.p>
              )}

              <motion.button
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.02 }}
                type="submit"
                className="w-full mt-6 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
              >
                Sign Up
              </motion.button>

              <p className="text-sm text-center mt-5 text-gray-600">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-blue-700 font-medium hover:underline"
                >
                  Log In
                </Link>
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SignUp;
