import StackHeaderLayout from "../components/layouts/StackHeaderLayout";
import { OrderRequestDetail } from "../features/customize-order";

const DetailedOrderRequest = () => {
  return (
    <StackHeaderLayout title="Your Order Request">
      <OrderRequestDetail />
    </StackHeaderLayout>
  );
};

export default DetailedOrderRequest;
