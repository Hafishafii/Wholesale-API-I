import { Skeleton } from "../../../components/ui/skeleton";

const OrderTrackCardSkeletion = () => {
  return (
    <div className="w-full md:max-w-3xl md:min-w-2xl mx-auto p-6 bg-white md:shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Order Tracking
      </h2>
      <div className="relative border-l-4 border-gray-200 ml-5">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="mb-8 ml-4 flex items-center space-x-4">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="w-32 h-4" />
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-48" />
      </div>
    </div>
  );
};

export default OrderTrackCardSkeletion;
