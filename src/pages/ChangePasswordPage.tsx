
import ChangePasswordForm from "../features/auth/components/ChangePasswordForm";
import StackHeaderLayout from "../components/layouts/StackHeaderLayout";

const ChangePasswordPage = () => {
  return (
    <StackHeaderLayout title="Change Password">
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <ChangePasswordForm />
      </div>
    </StackHeaderLayout>
  );
};

export default ChangePasswordPage;
