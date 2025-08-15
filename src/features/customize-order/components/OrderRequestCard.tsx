import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { gradientMap, statusMessages, statusStyles } from "../utils/styles";
import type { OrderRequest } from "../hooks/useOrderRequests";
import OrderDialog from "./OrderDialog";

type Props = {
  order: OrderRequest;
  onViewRequest?: (orderId: number) => void;
};

const OrderRequestCard = ({ order, onViewRequest }: Props) => {
  const gradient = gradientMap[order?.status || "pending"];

  return (
    <Card className="rounded-xl overflow-hidden shadow-sm border w-full mx-auto p-0 pb-3 gap-3">
      <div className={`bg-gradient-to-r h-28 w-full ${gradient} text-white`}>
        {order?.color_reference_image && (
          <img
            src={order?.color_reference_image}
            className="h-28 w-full object-cover"
            alt="Color Reference"
          />
        )}
      </div>

      <CardContent className="px-3 text-center flex flex-col gap-1">
        <p className="text-[16px] text-muted-foreground font-semibold">
          {order?.product_type} - {order?.style_pattern} / {order?.quantity}
        </p>
        <p className="text-xs text-gray-500">
          Created{" "}
          {order?.created_at
            ? formatDistanceToNow(new Date(order?.created_at), {
                addSuffix: true,
              })
            : "some time ago"}
        </p>
        <Badge
          className={`capitalize text-xs py-1 px-2 ${
            statusStyles[order?.status]
          }`}
        >
          {order?.status}
        </Badge>

        <div className="mt-2 flex flex-col gap-2 justify-between">
          {order?.final_price ? (
            <OrderDialog order={order} />
          ) : (
            <div
              className={`min-h-8 text-sm rounded ${
                statusStyles[order?.status]
              } !bg-background`}
            >
              {statusMessages[order?.status]}
            </div>
          )}
          <Button
            size="sm"
            className={`bg-gradient-to-r ${gradient} text-white hover:opacity-90 h-8 text-xs`}
            onClick={() => onViewRequest?.(order?.id)}
          >
            View Request
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderRequestCard;
