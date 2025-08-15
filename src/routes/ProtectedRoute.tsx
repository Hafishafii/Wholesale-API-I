import { Navigate, Outlet } from "react-router-dom";
import Spinner from "../components/common/Spinner";
import { useUser } from "../hooks/useUser";

const ProtectedRoute = () => {
  const { user, checked, loading } = useUser();

  if (!checked || loading) {
    return (
      <div className="flex backdrop-blur-xs justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
