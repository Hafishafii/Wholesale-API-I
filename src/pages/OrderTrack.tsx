import StackHeaderLayout from "../components/layouts/StackHeaderLayout";
import { OrderTrackCard } from "../features/order-tracking";

const OrderTrack = () => {
  return (
    <StackHeaderLayout title="Track Your Order">
      <div className="bg-white md:bg-gray-bg min-h-screen flex md:justify-center md:items-center">
        <OrderTrackCard />
      </div>
    </StackHeaderLayout>
  );
};

export default OrderTrack;
