import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import PasswordInput from '../../components/Input/PasswordInput'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'

const SignUp = () => {

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
   
  const handleSignUp = async (e) => {
    e.preventDefault();

    if(!name) {
      setError("Please enter your name");
      return;
    }

    if(!validateEmail(email)) {
      setError("Please enter a vaild email address");
      return;
    }

    if(!password) {
      setError("Please enter a password");
      return;
    }

    setError("");

    //SignUp API calls
    try {
      const response = await axiosInstance.post(`${API_BASE_URL}/create-account`, {
        fullName: name,
        email: email,
        password: password,
      });

      //
      if(response.data && response.data.error) {
        setError(response.data.message);
        return;
      }

      //
      if(response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }

    } catch(error) {
      //Handle login error
      console.error("Error details:", error);
      if(error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error has occured, try again !");
      }
    }

  }

  return (
    <>
    <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded-lg bg-white px-7 py-10">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7 text-center">SignUp</h4>

            <input 
              type="text"
              placeholder="Name"
              className="input-box rounded-lg border-[2px]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input 
              type="text"
              placeholder="Email"
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
              SignUp
            </button>

            <p className="text-sm text-center mt-4">
              Already have an account?&nbsp;
              {/* {" "} - this can also be used istead of &nbsp*/}
              <Link 
                to="/login" 
                className="font-medium text-primary underline">
                LogIn
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp