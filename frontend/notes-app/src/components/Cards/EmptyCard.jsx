import React from "react";
import { motion } from "framer-motion";

const EmptyCard = ({ imgSrc, message, onAdd }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative flex flex-col items-center justify-center mt-28 sm:mt-32 px-6 text-center"
    >
      {/* Subtle blue glow background */}
      <div className="absolute w-[20rem] sm:w-[28rem] h-[20rem] bg-blue-200/30 blur-[120px] rounded-full -z-10" />

      {/* Illustration */}
      <motion.img
        src={imgSrc}
        alt="No Notes"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        className="w-48 sm:w-60 opacity-95 drop-shadow-lg select-none"
      />

      {/* Headline */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 text-2xl sm:text-3xl font-semibold text-gray-800"
      >
        Your thoughts deserve a space.
      </motion.h2>

      {/* Message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-3 text-gray-500 text-sm sm:text-base max-w-md leading-relaxed"
      >
        {message ||
          "Start capturing your ideas, tasks, and inspirations in one clean, distraction-free space. Keep it simple. Keep it yours."}
      </motion.p>

      {/* CTA Button */}
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.96 }}
        onClick={onAdd}
        className="mt-8 px-8 py-3 text-sm sm:text-base font-semibold rounded-full 
                   bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 
                   text-white shadow-md hover:shadow-lg hover:brightness-105 transition-all"
      >
        Create Your First Note
      </motion.button>

      {/* Decorative gradient ring for subtle depth */}
      <div className="absolute -bottom-20 sm:-bottom-28 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-gradient-to-r from-blue-200/20 via-indigo-200/20 to-transparent blur-3xl -z-20" />
    </motion.div>
  );
};

export default EmptyCard;
