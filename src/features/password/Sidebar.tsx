import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white p-4 rounded-lg shadow-md">
      {/* Logo + Customer Name */}
      <div className="mb-6 flex flex-col items-center text-center">
        <img
          src="/logo.png" // Replace with your actual logo path
          alt="Logo"
          className="w-16 h-16 object-contain mb-2"
        />
        <h3 className="text-lg font-semibold text-gray-800">NOVA Textiles</h3>
      </div>

      {/* Status */}
      <div className="mb-6 text-center">
        <div className="text-sm text-gray-500">Active Status</div>
        <div className="flex justify-center items-center gap-2">
          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
          <span className="text-sm text-gray-700">Since March 2024</span>
        </div>
      </div>

      {/* Navigation Links */}
      <ul className="space-y-2">
        <li>
          <Link
            to="/profile"
            className="block p-2 rounded hover:bg-gray-100 text-gray-700"
          >
            Profile Information
          </Link>
        </li>
        <li>
          <Link
            to="/change_password"
            className="block p-2 rounded bg-blue-900 text-white"
          >
            Change Password
          </Link>
        </li>
        <li>
          <Link
            to="/bank"
            className="block p-2 rounded hover:bg-gray-100 text-gray-700"
          >
            Bank & Payment Info
          </Link>
        </li>
        <li>
          <Link
            to="/help_desk"
            className="block p-2 rounded hover:bg-gray-100 text-gray-700"
          >
            Help & Support
          </Link>
        </li>
        <li>
          <button className="flex items-center gap-2 p-2 w-full text-left rounded hover:bg-gray-100 text-gray-700">
            <FaSignOutAlt />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
