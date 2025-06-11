import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const PasswordInput = ({ value, onChange, placeholder = "Password" }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <div className="flex items-center border-2 px-4 py-2 rounded-lg mb-3 bg-white">
      <input
        type={isShowPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full text-sm bg-transparent outline-none"
      />
      <button
        type="button"
        onClick={() => setIsShowPassword(prev => !prev)}
        aria-label={isShowPassword ? 'Hide password' : 'Show password'}
        aria-pressed={isShowPassword}
        className="text-lg text-slate-500 hover:text-primary"
      >
        {isShowPassword ? <FaRegEye /> : <FaRegEyeSlash />}
      </button>
    </div>
  );
};

export default PasswordInput;
