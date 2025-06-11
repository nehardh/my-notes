import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import PasswordInput from '../../components/Input/PasswordInput';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';

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
        error.response?.data?.message || 'An unexpected error has occurred. Please try again!'
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="w-full max-w-md rounded-lg bg-white px-7 py-10 border-2 shadow-sm">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7 text-center font-semibold">Login</h4>

            <input
              type="text"
              placeholder="Email"
              className="w-full text-sm bg-transparent border-2 px-4 py-3 rounded-lg mb-3 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

            <button
              type="submit"
              className="w-full mt-5 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Login
            </button>

            <p className="text-sm text-center mt-4">
              Not registered yet?{' '}
              <Link to="/signup" className="text-primary font-medium underline">
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
