import AvatarComponent from "../../../../components/common/AvatarComponent";
import RetryWarning from "../../../../components/Warnings/RetryWarning";
import { defaultProfile } from "../../../../utils/helpers/constants";
import { useProfile } from "../hooks/useProfile";
import AccountDetailSkeleton from "./skeletons/AccountDetailSkeleton";

const AdminDetailsSection = () => {
  const { data, error, isLoading, refetch } = useProfile();

  if (isLoading) {
    return <AccountDetailSkeleton />;
  }

  if (error) {
    return (
      <RetryWarning
        title="Operation Failed!"
        description={error || "Failed to fetch user profile."}
        onRetry={refetch}
        isRetrying={isLoading}
      />
    );
  }

  return (
    <div className="space-y-4 w-full max-w-[1000px] md:min-w-[600px] lg:min-w-[800px] mx-auto p-[20px] md:p-[40px] sm:shadow bg-white md:mx-[30px] sm:rounded-xl flex flex-col md:flex-row gap-[20px] md:gap-[40px]">
      <AvatarComponent
        fallback="Profile Picture"
        alt="Your profile picture"
        src={data?.profile_pic || defaultProfile}
        className="w-[150px] sm:w-[200px] object-cover h-[150px] sm:h-[200px] mx-auto"
      />
      <section className="space-y-2 md:w-1/2">
        {data &&
          Object.entries(data).map(([key, value]) => {
            if (key === "profile_pic" || key === "id") return;
            if (key === "company_name") key = "Company Name";
            return (
              <div
                key={key}
                className="flex items-start justify-between border-b py-2 gap-3"
              >
                <span className="font-semibold capitalize">
                  {key.replace(/_/g, " ")}
                </span>
                <span>{String(value)}</span>
              </div>
            );
          })}
      </section>
    </div>
  );
};

export default AdminDetailsSection;
