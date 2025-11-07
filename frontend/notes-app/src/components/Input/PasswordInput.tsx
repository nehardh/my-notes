import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { motion } from "framer-motion";

const PasswordInput = ({
  value,
  onChange,
  placeholder = "Password",
  className = "",
}) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center bg-white/70 backdrop-blur-lg border border-blue-200 
                 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100
                 px-4 py-3 rounded-lg mb-4 shadow-sm transition-all duration-300 ${className}`}
    >
      {/* Password Input */}
      <input
        type={isShowPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="flex-grow text-sm sm:text-base bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
      />

      {/* Toggle Visibility Button */}
      <motion.button
        type="button"
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsShowPassword((prev) => !prev)}
        aria-label={isShowPassword ? "Hide password" : "Show password"}
        aria-pressed={isShowPassword}
        className="text-xl text-gray-500 hover:text-blue-600 transition-colors duration-200"
      >
        {isShowPassword ? <FaRegEye /> : <FaRegEyeSlash />}
      </motion.button>
    </motion.div>
  );
};

export default PasswordInput;
