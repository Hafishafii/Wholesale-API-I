import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Loader2 } from "lucide-react";
import { useCustomizeOrder } from "../hooks/useCustomizeOrder";
import { statusMessages, statusStyles } from "../utils/styles";
import CarouselImages from "../../admin/home/components/CarouselImages";
import AlertMessage from "../../../components/Warnings/AlertMessage";
import OrderDetails from "./OrderDetails";
import OrderDialog from "./OrderDialog";

const OrderRequestDetail = () => {
  const { order, loading, error } = useCustomizeOrder();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin w-6 h-6 text-muted-foreground" />
      </div>
    );
  }

  if (error || !order) {
    return <AlertMessage title={error || "Request not found."} type="error" />;
  }

  return (
    <div className="max-w-3xl mx-auto my-6 px-4">
      <Card>
        <CardHeader className="flex justify-between">
          <div>
            <p className="text-[16px] font-semibold">
              {order?.product_type} - {order?.style_pattern} / {order?.quantity}
            </p>
            <p className="text-xs text-gray-500">
              Created{" "}
              {order.created_at
                ? formatDistanceToNow(new Date(order.created_at), {
                    addSuffix: true,
                  })
                : "some time ago"}
            </p>
          </div>
          <Badge
            className={`capitalize text-xs py-1 px-2 ${
              statusStyles[order.status]
            }`}
          >
            {order.status}
          </Badge>
        </CardHeader>
        <CardContent>
          <OrderDetails selectedItem={order} />

          {Array.isArray(order.color_reference_image) &&
            order.color_reference_image?.length > 0 && (
              <div className="space-y-2 font-semibold">
                <label>Color Reference Images</label>
                <CarouselImages images={order.color_reference_image || [""]} />
              </div>
            )}
        </CardContent>
        <CardFooter className="flex justify-center items-center">
          {order.final_price ? (
            <OrderDialog order={order} />
          ) : (
            <div
              className={`min-h-8 px-3 py-2 rounded ${
                statusStyles[order?.status]
              }`}
            >
              {statusMessages[order?.status]}
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default OrderRequestDetail;
