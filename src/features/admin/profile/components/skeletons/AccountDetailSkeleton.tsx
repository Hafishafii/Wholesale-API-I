import { Skeleton } from "../../../../../components/ui/skeleton";

const AccountDetailSkeleton = () => {
  return (
    <div className="space-y-4 w-full max-w-[1000px] md:min-w-[600px] lg:min-w-[800px] mx-auto p-[20px] md:p-[40px] sm:shadow bg-white md:mx-[30px] sm:rounded-xl flex flex-col md:flex-row gap-[20px] md:gap-[40px]">
      <div className="flex justify-center">
        <Skeleton className="w-[150px] sm:w-[200px] h-[150px] sm:h-[200px] rounded-full" />
      </div>

      <section className="flex-1 space-y-4 w-full">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="space-y-1 w-full ">
            <Skeleton className="w-1/3 h-4" />
            <Skeleton className="w-full h-5" />
          </div>
        ))}
      </section>
    </div>
  );
};

export default AccountDetailSkeleton;
