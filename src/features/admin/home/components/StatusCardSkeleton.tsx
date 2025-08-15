import { Skeleton } from "../../../../components/ui/skeleton";

const StatusCardSkeleton = () => {
  return (
    <div className="bg-white text-center flex justify-center items-center flex-col rounded-md h-[150px] p-[20px] overflow-auto no-scrollbar shadow">
      <Skeleton className="h-4 w-[80px] mb-3" />
      <Skeleton className="h-6 w-[120px] md:w-[150px] lg:w-[180px]" />
    </div>
  );
};

export default StatusCardSkeleton;
