import { formatDistanceToNow } from "date-fns";
import RetryWarning from "../../../../components/Warnings/RetryWarning";
import { useUserActivities } from "../hooks/useUserActivities";
import CustomCard from "./CustomCard";
import CustomCardSkeleton from "./CustomCardSkeleton";
import FilterOptions from "./FilterOptions";
import PaginationButtons from "./PaginationButtons";
import { getActivityTitle } from "../utlis/renderIcons";
import { RefreshCw } from "lucide-react";

const UserActivities = () => {
  const {
    data,
    error,
    isLoading,
    refetch,
    filters,
    setFilters,
    applyFilters,
    ...props
  } = useUserActivities();

  // Render Error, if any
  const renderError = error && (
    <RetryWarning
      title="Operation Failed!"
      description={error || "Failed to fetch user activities"}
      onRetry={refetch}
      isRetrying={isLoading}
    />
  );

  // Render data , if there is no errors
  const renderData =
    !error &&
    !isLoading &&
    (data && data?.length > 0 ? (
      data?.map((item, idx) => (
        <CustomCard
          key={idx}
          description={formatDistanceToNow(item?.timestamp)}
          title={getActivityTitle(item.activity_type)}
        />
      ))
    ) : (
      <p className=" text-gray-700">No results found.</p>
    ));

  // Render Loading skeleton
  const renderSkeleton =
    isLoading &&
    Array.from({ length: 4 }).map((_, i) => <CustomCardSkeleton key={i} />);

  return (
    <div className="p-[20px] md:px-[30px] pt-0">
      <div className="flex items-center gap-2  mb-[20px]">
        <p className="font-semibold text-lg md:text-xl">User Activities</p>
        <FilterOptions
          onApply={applyFilters}
          type="User Activities"
          filters={filters}
          setFilters={setFilters}
        />
        <button disabled={isLoading} onClick={refetch}>
          <RefreshCw
            className={`${isLoading ? "animate-spin" : ""}`}
            size={18}
          />
        </button>
      </div>

      {renderError}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[10px] ">
        {renderSkeleton}
        {renderData}
      </div>

      <PaginationButtons {...props} />
    </div>
  );
};

export default UserActivities;
