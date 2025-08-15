import { Link } from "react-router-dom";
import HeaderLayout from "../components/layouts/HeaderLayout";

const NotFound = () => {
  return (
    <HeaderLayout>
      <div className="min-h-screen flex flex-col justify-center items-center bg-white text-center p-4">
        <h1 className="text-[100px] font-extrabold bg-gradient-to-r from-admin-bg to-blue-600 text-transparent bg-clip-text">
          Oops!
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          404 - PAGE NOT FOUND
        </h2>
        <p className="text-gray-500 mt-2 max-w-md">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="mt-6 px-6 py-3 bg-admin-bg hover:bg-black text-white font-semibold rounded-full transition duration-300"
        >
          Go to Homepage
        </Link>
      </div>
    </HeaderLayout>
  );
};

export default NotFound;
