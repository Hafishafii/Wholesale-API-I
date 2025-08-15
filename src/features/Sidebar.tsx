import { NavLink } from "react-router-dom";
import {
  FaHeart,
  FaKey,
  FaQuestionCircle,
  FaLifeRing,
  FaLock,
  FaHome,
} from "react-icons/fa";

const Sidebar = () => {
  const base = "flex items-center gap-3 px-4 py-2 rounded transition";
  const active = "bg-blue-100 text-blue-900 font-semibold";
  const inactive = "text-gray-700 hover:bg-blue-50";

  return (
    <div className="w-full md:w-64 h-full bg-white shadow-lg p-4">
      <nav className="space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <FaHome />
          Home
        </NavLink>
        <NavLink
          to="/wishlist"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <FaHeart />
          Wishlist
        </NavLink>
        <NavLink
          to="/change_password"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <FaKey />
          Change Password
        </NavLink>
        <NavLink
          to="/forgot-password"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <FaLock />
          Forgot Password
        </NavLink>
        <NavLink
          to="/help_desk"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <FaLifeRing />
          Help Desk
        </NavLink>
        <NavLink
          to="/FAQs"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <FaQuestionCircle />
          FAQs
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
