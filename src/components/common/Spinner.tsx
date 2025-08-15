import { FaSpinner } from "react-icons/fa";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <FaSpinner className="animate-spin text-3xl text-blue-500" />
    </div>
  );
};

export default Spinner;