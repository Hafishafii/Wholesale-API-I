import { Skeleton } from "../../../components/ui/skeleton";

const HomeSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Banner Skeleton */}
      <div className="flex flex-col md:flex-row w-full h-auto md:h-64 rounded overflow-hidden shadow-md bg-white">
        <div className="flex flex-col justify-center items-start px-4 py-8 md:px-8 bg-gray-200 w-full md:w-1/2 h-auto md:h-full">
          <Skeleton className="h-8 w-3/4 mb-3" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3 mb-6" />
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            <Skeleton className="h-10 w-24 md:w-32" />
            <Skeleton className="h-10 w-32 md:w-40" />
          </div>
        </div>
        <div className="w-full md:w-1/2 h-48 md:h-full">
          <Skeleton className="w-full h-full" />
        </div>
      </div>

      {/* Categories Skeleton */}
      <div className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-4 shadow-sm">
                <Skeleton className="h-32 w-full mb-3" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wholesale Favorites Skeleton */}
      <div className="py-8 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <Skeleton className="h-8 w-64 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-4">
                <Skeleton className="h-48 w-full mb-4" />
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-3" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us Skeleton */}
      <div className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow-sm text-center">
                <Skeleton className="h-16 w-16 mx-auto mb-4 rounded-full" />
                <Skeleton className="h-6 w-3/4 mx-auto mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="bg-gray-800 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <Skeleton className="h-6 w-32 mb-4 bg-gray-600" />
                <div className="space-y-2">
                  {[...Array(4)].map((_, j) => (
                    <Skeleton key={j} className="h-4 w-24 bg-gray-600" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSkeleton; 