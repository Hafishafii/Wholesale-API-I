import { useParams } from "react-router-dom";
import { useOrderDetails } from "../../features/admin/order/hooks/useOrderDetails";
import OrderDetailsForm from "../../features/admin/order/components/OrderDetailsForm";
import { Skeleton } from "../../components/ui/skeleton";
import StackHeaderLayout from "../../components/layouts/StackHeaderLayout";

const OrderDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading } = useOrderDetails(id || "");

  return (
    <StackHeaderLayout title="Order Details">
      <div className="max-w-3xl mx-auto mt-8 p-4 border rounded-lg bg-white shadow">
        {loading && <Skeleton className="w-full h-[500px]" />}
        {!loading && data && (
          <>
            {/* Removed debug JSON output */}
            <OrderDetailsForm order={data} />
          </>
        )}
        {!loading && !data && (
          <div className="text-center text-gray-600">Order not found or failed to load.</div>
        )}
      </div>
    </StackHeaderLayout>
  );
};

export default OrderDetailsPage;
