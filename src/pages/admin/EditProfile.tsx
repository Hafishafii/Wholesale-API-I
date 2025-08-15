import StackHeaderLayout from "../../components/layouts/StackHeaderLayout";
import { EditProfileForm } from "../../features/admin/profile";

const EditProfile = () => {
  return (
    <StackHeaderLayout title="Edit Profile" className="bg-gray-bg min-h-screen">

      <div className="min-h-screen flex justify-center items-center">
        <EditProfileForm />
      </div>

    </StackHeaderLayout>
  );
};

export default EditProfile;
