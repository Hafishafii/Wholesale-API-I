import  { useState, useEffect } from "react";
import StackHeaderLayout from "../components/layouts/StackHeaderLayout";
import { CustomizeOrder } from "../features/customize-order";
import { Skeleton } from "../components/ui/skeleton";

const CustomizeYourOrder = () => {
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    // Simulate page loading time
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isPageLoading) {
    return (
      <StackHeaderLayout>
        <div className="bg-gray-200 min-h-screen flex flex-col items-center py-4 sm:py-6 md:py-8 lg:py-10 relative px-2 sm:px-4 md:px-6 lg:px-8">
          <Skeleton className="h-8 w-64 mb-4 sm:mb-6 md:mb-8" />
          <div className="bg-gray-200 shadow-lg rounded-lg p-4 sm:p-6 md:p-8 lg:p-10 w-full max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-6xl flex flex-col gap-4 sm:gap-6">
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
            <Skeleton className="h-6 w-48 mb-4" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-6 w-40 mb-4" />
            <div className="flex flex-wrap gap-3 sm:gap-4 items-center justify-center sm:justify-start">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg" />
              ))}
            </div>
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-6 w-44 mb-4" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-6 w-48 mb-4" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 mb-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
            <Skeleton className="h-6 w-36 mb-4" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-6 w-52 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
            <Skeleton className="h-6 w-64 mb-4" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </StackHeaderLayout>
    );
  }

  return (
    <StackHeaderLayout>
      <CustomizeOrder />
    </StackHeaderLayout>
  );
};

export default CustomizeYourOrder; 