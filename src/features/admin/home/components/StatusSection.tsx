import RetryWarning from "../../../../components/Warnings/RetryWarning";
import { useAnalytics } from "../hooks/useAnalytics";
import StatusCard from "./StatusCard";
import StatusCardSkeleton from "./StatusCardSkeleton";

const StatusSection = () => {
  const { data, error, isLoading, refetch } = useAnalytics();

  // Render Error, if any
  const renderError = error && (
    <RetryWarning
      title="Operation Failed!"
      description={error || "Failed to fetch data"}
      onRetry={refetch}
      isRetrying={isLoading}
    />
  );

  // Render Loading skeleton
  const renderSkeleton =
    isLoading &&
    Array.from({ length: 4 }).map((_, i) => <StatusCardSkeleton key={i} />);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-[10px] sm:gap-[20px] p-[20px] md:p-[30px]">
      {renderError}

      {renderSkeleton}

      {!error &&
        data &&
        Object.entries(data).map(([key, value], idx) => {
          const item = {
            label: key.replaceAll("_", " ") as string,
            value: Number(value),
          };
          return <StatusCard {...item} key={idx} />;
        })}
    </div>
  );
};

export default StatusSection;
