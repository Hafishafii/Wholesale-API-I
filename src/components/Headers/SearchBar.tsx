import { Input } from "../ui/input";
import { IoMdSearch } from "react-icons/io";

const SearchBar = () => {
  return (
    <div className="relative w-full md:max-w-[500px] lg:max-w-[600px]">
      <Input className="!bg-white rounded-full text-black pl-[35px] h-[35px]" placeholder="Search wholesale products..." />
      <button className="absolute -translate-y-1/2 translate-x-2 top-1/2">
        <IoMdSearch size={25}  className="text-gray-500" />
      </button>
    </div>
  );
};

export default SearchBar;
