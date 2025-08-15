import AvatarComponent from "../../../../components/common/AvatarComponent";
import { useAdmin } from "../../../../hooks/useAdmin";
import { defaultProfile } from "../../../../utils/helpers/constants";


const WelcomeBack = () => {
  const { admin } = useAdmin();

  return (
    <div className="px-[20px] pt-[20px] md:px-[30px] flex items-center gap-[10px]">
      <AvatarComponent
        fallback="DP"
        alt="your profile picture"
        src={defaultProfile}
        className="h-[50px] w-[50px]"
      />
      <p className="text-lg">Welcome Back {admin?.first_name}</p>
    </div>
  );
};

export default WelcomeBack;
