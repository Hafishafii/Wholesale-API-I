import React from 'react';
import { FiArrowLeft, FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

interface Props {
  title?: string;
  onMenuClick?: () => void;
}

const Topbar: React.FC<Props> = ({ onMenuClick, title }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <header className="bg-blue-900 text-white flex items-center justify-between px-4 py-3 relative">
      {/* Hamburger for mobile */}
      <button onClick={onMenuClick} className="text-2xl md:hidden">
        ☰
      </button>

      {/* Back Arrow for desktop */}
      <button onClick={handleBack} className="hidden md:block text-2xl">
        <FiArrowLeft />
      </button>

      {/* Search Bar */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-2/3 md:w-1/3">
        <div className="relative">
          <FiSearch className="absolute left-3 top-2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 text-black"
          />
        </div>
      </div>

      {/* Title or Greeting */}
      {title ? (
        <h1 className="text-lg font-semibold hidden md:block">{title}</h1>
      ) : (
        <div className="font-medium text-sm">Hi, Customer Name</div>
      )}
    </header>
  );
};

export default Topbar;
