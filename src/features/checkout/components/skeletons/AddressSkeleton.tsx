const AddressSkeleton = () => {
  return (
    <div className="animate-pulse mb-6 space-y-2">
      <div className="h-4 w-24 bg-gray-300 rounded" />
      <div className="space-y-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-3 w-full bg-gray-200 rounded" />
        ))}
      </div>
      <div className="h-6 w-20 bg-gray-300 rounded mt-2" />
    </div>
  );
};

export { AddressSkeleton };
