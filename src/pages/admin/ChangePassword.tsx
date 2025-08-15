import StackHeaderLayout from "../../components/layouts/StackHeaderLayout";
import { ChangePasswordForm } from "../../features/admin/profile";

const ChangePassword = () => {
  return (
    <StackHeaderLayout
      title="Change Password"
      className="sm:bg-gray-bg sm:min-h-screen"
    >
      <div className="sm:min-h-screen flex justify-center items-center">
        <ChangePasswordForm />
      </div>
    </StackHeaderLayout>
  );
};

export default ChangePassword;
