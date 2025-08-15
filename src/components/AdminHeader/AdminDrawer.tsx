import { adminNavLinks } from "./data";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { IoMdMenu } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { appName } from "../../utils/helpers/constants";
type Props = {
  color?: string;
};

const AdminDrawer = ({ color }: Props) => {
  const location = useLocation();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="mr-2 text-white focus:outline-none">
          <IoMdMenu size={28} />
        </button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className={`w-[250px] p-4 ${color ? "" : "bg-admin-bg"}`}
        style={color ? { background: color } : {}}
      >
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold text-white mb-4">
            {appName}
          </SheetTitle>
        </SheetHeader>

        <nav>
          <ul className="flex flex-col gap-2">
            {adminNavLinks?.map((item, index) => {
              const isActive = location.pathname === item.path;

              return (
                <li key={index}>
                  <SheetClose asChild>
                    <Link
                      to={item.path}
                      className={`block px-4 py-2 rounded-md transition-all duration-200 ${
                        isActive
                          ? "bg-white text-admin-bg font-semibold border-l-4 border-blue-500"
                          : "text-white hover:bg-[#002366] hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                </li>
              );
            })}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default AdminDrawer;
