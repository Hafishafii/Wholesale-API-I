import AdminLayout from "../../components/layouts/AdminLayout";
import {
  OrderRequests,
  StatusSection,
  UserActivities,
  WelcomeBack,
} from "../../features/admin/home";

const AdminHome = () => {
  return (
    <AdminLayout>

      <WelcomeBack />

      <StatusSection />

      <UserActivities />

      <OrderRequests />
      
    </AdminLayout>
  );
};

export default AdminHome;
