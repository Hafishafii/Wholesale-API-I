import StackHeaderLayout from "../components/layouts/StackHeaderLayout";
import { EditProfilePage } from "../features/editProfile";

const EditProfile = () => {
  return (
    <StackHeaderLayout title="Edit Profile">
      <EditProfilePage />
    </StackHeaderLayout>
  );
};

export default EditProfile;
