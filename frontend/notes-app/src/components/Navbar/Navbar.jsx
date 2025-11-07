import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import SearchBar from "../SearchBar/SearchBar";
import { motion, useScroll, useTransform } from "framer-motion";

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    const trimmed = searchQuery.trim();
    if (trimmed) onSearchNote(trimmed);
  };

  const handleClear = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  // Scroll-based background opacity — fades to solid as you scroll down

  return (
    <motion.nav
      style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full sticky top-0 z-50 backdrop-blur-2xl border-blue-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3">
        {/* Left: Logo */}
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 px-1 hover:scale-[1.03] active:scale-[0.97] transition-transform"
        >
          <div className="text-xl sm:text-2xl font-bold text-blue-700 tracking-tight">
            MyNotes
          </div>
        </button>

        {/* Center: Search */}
        <div className="flex-grow max-w-[500px] hidden sm:block">
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onSearch={handleSearch}
            onClear={handleClear}
          />
        </div>

        {/* Right: Profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden md:block text-gray-700 text-sm font-medium truncate max-w-[150px]">
            {userInfo?.fullName || "Guest"}
          </div>

          <img
            src={
              userInfo?.avatar ||
              `https://ui-avatars.com/api/?name=${userInfo?.fullName || "User"}&background=random`
            }
            alt="User Avatar"
            className="w-9 h-9 rounded-full object-cover border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300"
          />

          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-red-500 hover:text-red-600 transition p-2 rounded-lg hover:bg-red-50 flex items-center justify-center"
            title="Logout"
          >
            <FaSignOutAlt size={18} />
          </motion.button>
        </div>
      </div>

      {/* Mobile Search — below main row */}
      <div className="sm:hidden px-4 pb-3">
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={handleSearch}
          onClear={handleClear}
        />
      </div>
    </motion.nav>
  );
};

export default Navbar;
