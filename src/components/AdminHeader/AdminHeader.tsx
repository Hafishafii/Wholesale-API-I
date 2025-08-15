import { Link, useLocation } from "react-router-dom";
import { appName } from "../../utils/helpers/constants";
import { adminNavLinks } from "./data";
import SearchBar from "./SearchBar";
import AdminDrawer from "./AdminDrawer";
import { IoMdNotificationsOutline } from "react-icons/io";

type Props = {
  color?: string;
};
const AdminHeader = ({ color }: Props) => {
  const location = useLocation();

  return (
    <div
      className={`flex p-[15px] sm:p-[20px] md:pb-[10px] text-white flex-col relative ${
        color ? "" : "bg-admin-bg"
      }`}
      style={color ? { background: color } : {}}
    >
      <p className="hidden font-semibold absolute left-[20px] top-[20px] text-xl lg:text-2xl h-[35px] md:flex items-center">
        {appName}
      </p>

      <div className="flex md:justify-center items-center w-full">
        <div className="flex md:hidden">
          <AdminDrawer color={color} />
        </div>
        <SearchBar />
      </div>

      <div className="w-full justify-between items-center hidden md:flex mt-[10px] px-[30px]">
        <div className="w-[30px]" />
        <ul className="flex justify-between items-center gap-[10px] w-full max-w-[400px]">
          {adminNavLinks.slice(0, 5)?.map((item, index) => {
            const isActive = location.pathname === item.path;

            return (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`px-3 py-1 rounded-md transition-all duration-200 ${
                    isActive
                      ? "text-orange-400 font-semibold"
                      : "text-white hover:text-blue-400"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center justify-between w-[30px]">
          <Link
            to="/admin/notification"
            className={`transition-colors ${
              location.pathname === "/admin/notification"
                ? "text-orange-400"
                : "text-white hover:text-blue-400"
            }`}
          >
            <IoMdNotificationsOutline size={25} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
