import HeaderLayout from "../components/layouts/HeaderLayout";
import { UserAccountPage } from "../features/UserAccount";

const UserAccount = () => {
  return (
    <HeaderLayout>
      <UserAccountPage />
    </HeaderLayout>
  );
};

export default UserAccount;
