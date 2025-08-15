import React, { useState, useEffect } from 'react';
import { RegisterForm } from '../features/auth';
import { Skeleton } from '../components/ui/skeleton';

const Register: React.FC = () => {
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
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f7f7' }}>
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
          <Skeleton className="h-4 w-20 mb-4" />
          <Skeleton className="h-8 w-48 mx-auto mb-7" />
          <Skeleton className="h-12 w-full mb-4" />
          <Skeleton className="h-12 w-full mb-4" />
          <Skeleton className="h-12 w-full mb-4" />
          <Skeleton className="h-12 w-full mb-4" />
          <Skeleton className="h-12 w-full mb-4" />
          <Skeleton className="h-6 w-1/2 mb-4" />
          <Skeleton className="h-12 w-full mb-4" />
          <Skeleton className="h-6 w-1/3 mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh',  alignItems: 'center', justifyContent: 'center', background: '#f7f7f7' }}>
      <RegisterForm />
    </div>
  );
};

export default Register; 