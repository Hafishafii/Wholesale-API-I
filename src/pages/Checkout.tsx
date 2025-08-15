import StackHeaderLayout from "../components/layouts/StackHeaderLayout";
import CheckoutPage from "../features/checkout/CheckoutPage";

const Checkout = () => {
  return (
    <StackHeaderLayout title="Checkout">
      {/* <Topbar/> */}
      <CheckoutPage />
    </StackHeaderLayout>
  );
};

export default Checkout;
