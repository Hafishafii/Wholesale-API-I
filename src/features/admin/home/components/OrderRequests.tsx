import { useState } from "react";
import RetryWarning from "../../../../components/Warnings/RetryWarning";
import { useOrderRequests } from "../hooks/useOrderRequests";
import CustomCard from "./CustomCard";
import CustomCardSkeleton from "./CustomCardSkeleton";
import FilterOptions from "./FilterOptions";
import PaginationButtons from "./PaginationButtons";
import DetailedOrderRequest from "./DetailedOrderRequest";
import { RefreshCw } from "lucide-react";

const OrderRequests = () => {
  const {
    data,
    error,
    isLoading,
    refetch,
    filters,
    setFilters,
    applyFilters,
    updateStatus,
    ...props
  } = useOrderRequests();

  const [selectedID, setSelectedID] = useState<number | undefined>();
  
  // Render Error, if any
  const renderError = error && (
    <RetryWarning
      title="Operation Failed!"
      description={error || "Failed to fetch order request"}
      onRetry={refetch}
      isRetrying={isLoading}
    />
  );

  // Render data , if there is no errors
  const renderData =
    !error &&
    !isLoading &&
    (data && data?.length > 0 ? (
      data?.map((item, idx) => (
        <div
          className="cursor-pointer"
          key={idx}
          onClick={() => setSelectedID(item?.id)}
        >
          <CustomCard
            description={item?.product_type}
            status={item?.status}
            title={item?.name}
          />
        </div>
      ))
    ) : (
      <p className=" text-gray-700">No results found.</p>
    ));

  // Render Loading skeleton
  const renderSkeleton =
    isLoading &&
    Array.from({ length: 12 }).map((_, i) => <CustomCardSkeleton key={i} />);

  return (
    <div className="p-[20px] pt-0 md:px-[30px]">
      <DetailedOrderRequest
        onStatusUpdate={updateStatus}
        onCancel={() => setSelectedID(undefined)}
        selectedItem={data?.find((i) => selectedID === i.id)}
      />

      <div className="flex items-center gap-2  mb-[20px]">
        <p className="font-semibold text-lg md:text-xl">
          Customized Order Request
        </p>
        <FilterOptions
          onApply={applyFilters}
          type="Order Request"
          filters={filters}
          setFilters={setFilters}
        />
        <button
          disabled={isLoading}
          onClick={refetch}
        >
          <RefreshCw className={`${isLoading ? "animate-spin" : ""}`} size={18} />
        </button>
      </div>

      {renderError}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[10px] ">
        {renderSkeleton}
        {renderData}
      </div>

      <PaginationButtons {...props} />
    </div>
  );
};

export default OrderRequests;
