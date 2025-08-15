import { Skeleton } from "../../../../../components/ui/skeleton";

const EditProfileSkeleton = () => {
  return (
    <div className="space-y-4 w-full max-w-[1000px] md:min-w-[600px] lg:min-w-[800px] mx-auto p-[20px] md:p-[40px] shadow  md:mx-[30px] md:rounded-xl bg-white md:grid grid-cols-1 md:grid-cols-2 gap-[20px] md:gap-[40px] animate-pulse">
      <div className="flex flex-col items-center justify-between gap-4 h-full">
        <Skeleton className="w-[150px] h-[150px] rounded-full " />
        <Skeleton className="hidden md:block w-full h-10  rounded-lg" />
      </div>

      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i}>
            <Skeleton className="w-24 h-4  rounded mb-1" />
            <Skeleton className="w-full h-10  rounded" />
          </Skeleton>
        ))}

        <Skeleton>
          <Skeleton className="w-12 h-4  rounded mb-1" />
          <Skeleton className="w-full h-[75px]  rounded" />
        </Skeleton>
      </div>

      <div className="md:hidden col-span-2">
        <Skeleton className="w-full h-10  rounded-lg" />
      </div>
    </div>
  );
};

export default EditProfileSkeleton;
