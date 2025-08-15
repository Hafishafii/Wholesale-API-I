import StackHeaderLayout from "../components/layouts/StackHeaderLayout";
import { UserProfilePage } from "../features/userProfile";

const UserProfile = () => {
  return (
    <StackHeaderLayout title="Profile">
      <UserProfilePage />
    </StackHeaderLayout>
  );
};

export default UserProfile;
