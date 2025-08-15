const ProductSkeleton = () => {
  return (
    <div className="animate-pulse mb-6 space-y-4">
      <div className="h-4 w-2/3 bg-gray-300 rounded" />
      <div className="h-3 w-1/2 bg-gray-200 rounded" />
      <div className="flex gap-4 mt-3">
        <div className="w-20 h-24 bg-gray-300 rounded" />
        <div className="space-y-2 flex-1">
          <div className="h-3 w-1/3 bg-gray-300 rounded" />
          <div className="h-4 w-1/2 bg-gray-400 rounded" />
          <div className="flex gap-1">
            <div className="h-2 w-8 bg-gray-200 rounded" />
            <div className="h-2 w-20 bg-gray-200 rounded" />
          </div>
        </div>
      </div>

      <div className="h-4 w-20 bg-gray-200 rounded mt-4" />
      <div className="flex gap-2 mt-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="w-9 h-9 rounded-full bg-gray-200" />
        ))}
      </div>

      <div className="flex gap-4 mt-4">
        <div className="h-9 w-40 bg-gray-200 rounded" />
        <div className="h-9 w-40 bg-gray-200 rounded" />
      </div>
    </div>
  );
};

export { ProductSkeleton };
