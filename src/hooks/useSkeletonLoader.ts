import type { ReactNode } from "react";

export const useSkeletonLoader = (
  loading: boolean,
  fallback: ReactNode,
  children: ReactNode
): ReactNode => {
  return loading ? fallback : children;
};
