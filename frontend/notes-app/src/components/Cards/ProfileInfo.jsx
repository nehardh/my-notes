import React from "react";
import { motion } from "framer-motion";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ userInfo, onLogout }) => {
  const initials = getInitials(userInfo?.fullName);

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex items-center gap-3 sm:gap-4 px-3 py-2 rounded-xl bg-white/60 backdrop-blur-lg border border-blue-100 shadow-sm hover:shadow-md transition-all"
    >
      {/* Avatar / Initials */}
      <div className="relative w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-blue-700 font-semibold bg-gradient-to-br from-blue-100 to-white shadow-inner">
        {initials}
      </div>

      {/* Name + Action */}
      <div className="flex flex-col">
        <p className="text-sm sm:text-base font-medium text-gray-800 truncate max-w-[120px] sm:max-w-[160px]">
          {userInfo?.fullName || "Guest User"}
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onLogout}
          className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium underline-offset-2 hover:underline transition-colors"
        >
          Logout
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProfileInfo;
