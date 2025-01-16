import React, { useState } from 'react'
import { Link } from 'react-router-dom'  // Add this import
import Navbar from '../../components/Navbar/Navbar'
import PasswordInput from '../../components/Input/PasswordInput'
import { validateEmail } from '../../utils/helper'

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    if(!validateEmail(email)) {
      setError("Please enter a vaild email address");
      return;
    }

    if(!password) {
      setError("Please enter a password");
      return;
    }

    setError("");

    //Login API calls
  }

  return (  
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 rounded-lg bg-white px-7 py-10 border-[2px]">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7 text-center">Login</h4>

            <input 
              type="text" 
              placeholder='Email' 
              className="input-box rounded-lg border-[2px]" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />

            <PasswordInput 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-xs pb-1 pl-1">{error}</p>}

            <button type="submit" className="btn-primary rounded-lg">
              Login
            </button>

            <p className="text-sm text-center mt-4">
              Not registered yet?&nbsp;
              {/* {" "} - this can also be used istead of &nbsp*/}
              <Link 
                to="/signup" 
                className="font-medium text-primary underline">
                Create Account
              </Link>
            </p>

          </form>
        </div>
      </div>
    </>
  )
}

export default Login
