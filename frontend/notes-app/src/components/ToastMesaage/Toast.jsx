import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuCheck } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";

const Toast = ({ isShown, message, type = "success", onClose }) => {
  useEffect(() => {
    if (isShown) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isShown, onClose]);

  const colors =
    type === "delete"
      ? {
          accent: "bg-red-500",
          bg: "bg-red-50/60",
          text: "text-red-600",
          icon: <MdDeleteOutline className="text-xl text-red-500" />,
        }
      : {
          accent: "bg-green-500",
          bg: "bg-green-50/60",
          text: "text-green-600",
          icon: <LuCheck className="text-xl text-green-500" />,
        };

  return (
    <AnimatePresence>
      {isShown && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed top-6 right-6 z-[9999]"
        >
          <div
            className={`relative min-w-[230px] sm:min-w-[260px] flex items-center gap-3 
              px-4 py-3 rounded-xl shadow-lg border border-blue-100 
              backdrop-blur-lg bg-white/70`}
          >
            {/* Left Accent Bar */}
            <div
              className={`absolute left-0 top-0 h-full w-[4px] rounded-l-lg ${colors.accent}`}
            />

            {/* Icon */}
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${colors.bg}`}
            >
              {colors.icon}
            </div>

            {/* Text */}
            <p
              className={`text-sm sm:text-base ${colors.text} font-medium leading-snug`}
            >
              {message}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
