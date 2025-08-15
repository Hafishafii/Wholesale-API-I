import OrderRequestCard from "./OrderRequestCard";
import { useOrderRequests } from "../hooks/useOrderRequests";
import { Skeleton } from "../../../components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import PaginationButtons from "../../admin/home/components/PaginationButtons";

const OrderRequestsList = () => {
  const { data, isLoading, error, refetch, ...props } = useOrderRequests();

  const navigate = useNavigate();

  const handleViewRequest = (id: number) => {
    navigate(`/profile/requests/${id}`);
  };

  return (
    <div className="p-[20px] space-y-4 max-w-8xl mx-auto">
      <div className="flex justify-between items-center">
        <button
          onClick={refetch}
          className="text-sm px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
        >
          Refresh
        </button>
      </div>

      {error && <p className="text-red-500">Error: {error}</p>}

      {!isLoading && data?.length === 0 && (
        <p className="text-muted-foreground">No order requests found.</p>
      )}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[15px] md:gap-[25px]">
        {isLoading &&
          Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="h-[300px] rounded-xl" />
          ))}
        {!isLoading &&
          data?.map((order) => (
            <OrderRequestCard
              key={order.id}
              order={order}
              onViewRequest={handleViewRequest}
            />
          ))}
      </div>
      <PaginationButtons {...props} />
    </div>
  );
};

export default OrderRequestsList;
