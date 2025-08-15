// src/features/admin/notification/components/NotificationSkeleton.tsx

import { Skeleton } from "../../../../components/ui/skeleton";

export const NotificationSkeleton = () => (
  <div className="p-4 border rounded-lg space-y-3">
    <div className="flex justify-between items-center">
      <Skeleton className="h-4 w-[120px]" />
      <Skeleton className="h-3 w-[60px]" />
    </div>
    <Skeleton className="h-3 w-[200px]" />
    <Skeleton className="h-3 w-[150px]" />
  </div>
);

export const NotificationListSkeleton = ({ count = 5 }: { count?: number }) => (
  <div className="space-y-3">
    {Array.from({ length: count }).map((_, i) => (
      <NotificationSkeleton key={i} />
    ))}
  </div>
);