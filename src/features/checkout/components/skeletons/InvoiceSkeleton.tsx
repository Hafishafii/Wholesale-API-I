const InvoiceSkeleton = () => {
  return (
    <div className="animate-pulse space-y-2">
      <div className="h-4 w-24 bg-gray-300 rounded" />
      <div className="h-3 w-1/2 bg-gray-200 rounded" />
      <div className="h-3 w-1/2 bg-gray-200 rounded" />
      <div className="h-3 w-1/3 bg-gray-200 rounded" />
      <div className="h-4 w-24 bg-gray-300 rounded mt-3" />
    </div>
  );
};

export { InvoiceSkeleton };
