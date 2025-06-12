import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import SearchBar from '../SearchBar/SearchBar';

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleSearch = () => {
    if (searchQuery.trim()) onSearchNote(searchQuery.trim());
  };

  const onClearSearch = () => {
    setSearchQuery('');
    handleClearSearch();
  };

  return (
    <nav className="w-full sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

        {/* Logo - visible only on tablets and up */}
        <button onClick={() => navigate('/dashboard')}>
          <div className="hidden sm:block text-xl font-bold text-primary whitespace-nowrap">
            📝 MyNotes
          </div>
        </button>

        {/* Mobile layout: search and user section side by side */}
        <div className="flex w-full sm:hidden items-center justify-between gap-2">
          {/* Search (takes more space) */}
          <div className="flex-grow">
            <SearchBar
              value={searchQuery}
              onChange={({ target }) => setSearchQuery(target.value)}
              handleSearch={handleSearch}
              onClearSearch={onClearSearch}
            />
          </div>

          {/* Avatar & Logout */}
          <div className="flex items-center gap-2">
            <img
              src={userInfo?.avatar || `https://ui-avatars.com/api/?name=${userInfo?.fullName}&background=random`}
              alt="User Avatar"
              className="w-9 h-9 rounded-full object-cover border"
            />
            <button
              onClick={onLogout}
              className="text-red-500 hover:text-red-600 transition"
              title="Logout"
            >
              <FaSignOutAlt size={18} />
            </button>
          </div>
        </div>

        {/* Desktop layout: search and user section in separate blocks */}
        <div className="hidden sm:flex w-full items-center justify-between">
          <div className="flex-1 mr-4">
            <SearchBar
              value={searchQuery}
              onChange={({ target }) => setSearchQuery(target.value)}
              handleSearch={handleSearch}
              onClearSearch={onClearSearch}
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:block text-gray-700 text-sm">
              {userInfo?.fullName || 'Guest'}
            </div>
            <img
              src={userInfo?.avatar || `https://ui-avatars.com/api/?name=${userInfo?.fullName}&background=random`}
              alt="User Avatar"
              className="w-9 h-9 rounded-full object-cover border"
            />
            <button
              onClick={onLogout}
              className="text-red-500 hover:text-red-600 transition p-2"
              title="Logout"
            >
              <FaSignOutAlt size={18} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
