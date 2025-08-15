import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

type Props = {
  title: string;
};
const StackHeader = ({ title }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="flex text-lg font-medium md:text-xl p-[10px] md:py-[20px] md:px-[30px] lg:px-[50px] bg-admin-bg text-white gap-[10px] md:gap-[20px] items-center sticky top-0 z-100 w-full">
      <button onClick={() => navigate(-1)}>
        <IoIosArrowBack size={22} />
      </button>
      <p>{title}</p>
    </div>
  );
};

export default StackHeader;
