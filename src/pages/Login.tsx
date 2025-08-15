import React, { useState, useEffect } from 'react';
import { LoginForm } from '../features/auth';
import { Skeleton } from '../components/ui/skeleton';

const Login: React.FC = () => {
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    // Simulate page loading time
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isPageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-[700px] min-w-[280px] min-h-[700px] mx-auto p-6 sm:p-10 md:p-12 rounded-xl bg-white shadow-lg flex flex-col justify-center">
          {/* Company name skeleton */}
          <Skeleton className="h-8 sm:h-10 md:h-12 lg:h-14 w-3/4 mx-auto mb-7" />
          
          {/* Sign in text skeleton */}
          <Skeleton className="h-5 sm:h-6 w-1/2 mx-auto mb-6" />
          
          {/* Email field skeleton */}
          <div className="mb-4 sm:mb-5">
            <Skeleton className="h-4 sm:h-5 w-24 mb-1" />
            <Skeleton className="h-12 w-full" />
          </div>
          
          {/* Password field skeleton */}
          <div className="mb-4 sm:mb-5">
            <div className="flex justify-between items-center mb-1">
              <Skeleton className="h-4 sm:h-5 w-20" />
              <Skeleton className="h-3 sm:h-4 w-16" />
            </div>
            <Skeleton className="h-12 w-full" />
          </div>
          
          {/* Login button skeleton */}
          <Skeleton className="h-12 w-full my-4 sm:my-5" />
          
          {/* Sign up text skeleton */}
          <Skeleton className="h-4 sm:h-5 w-2/3 mx-auto mt-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginForm />
    </div>
  );
};

export default Login; 