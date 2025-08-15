import { Navigate, Outlet } from "react-router-dom";
import { useAdmin } from "../hooks/useAdmin";
import Spinner from "../components/common/Spinner";

const AdminOnlyRoute = () => {
  const { admin, checked, loading } = useAdmin();

  if (!checked || loading) {
    return (
      <div className="flex backdrop-blur-xs justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }
  return admin ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminOnlyRoute;
