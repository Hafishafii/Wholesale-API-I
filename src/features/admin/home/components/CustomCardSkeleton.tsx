import { Skeleton } from "../../../../components/ui/skeleton";

const CustomCardSkeleton = () => {
  return (
    <div className="p-[10px] flex gap-[10px] bg-white rounded shadow">
      <div className="bg-admin-bg aspect-square h-[50px] flex justify-center items-center rounded">
        <Skeleton className="h-[25px] w-[25px] rounded-full" />
      </div>
      <div className="flex flex-col justify-center gap-1">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-3 w-[150px]" />
      </div>
    </div>
  );
};

export default CustomCardSkeleton;
