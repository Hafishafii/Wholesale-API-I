import StackHeaderLayout from "../../components/layouts/StackHeaderLayout";
import AdminDetailsSection from "../../features/admin/profile/components/AdminDetailsSection";

const AccountDetails = () => {
  return (
    <StackHeaderLayout
      title="Account Details"
      className="sm:bg-gray-bg sm:min-h-screen"
    >
      <div className="sm:min-h-screen flex justify-center items-center">
        <AdminDetailsSection />
      </div>
      
    </StackHeaderLayout>
  );
};

export default AccountDetails;
