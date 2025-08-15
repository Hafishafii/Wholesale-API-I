import PurchaseDetails from "./PurchaseDetails";
import Loading from "./Loading";
import useFetchPurchase from "../hooks/useFetchPurchase";

const PurchasePage = () => {
  const { purchaseDetails, isLoading } = useFetchPurchase();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main
      className="p-6 bg-gray-100 min-h-screen"
      aria-labelledby="purchase-heading"
    >
      <section className="max-w-[1000px] mx-auto">
        <h2
          id="purchase-heading"
          className="my-8 text-3xl font-bold text-center"
        >
          View Your Purchases
        </h2>
        <div className="flex flex-col gap-4">
          {purchaseDetails && purchaseDetails.length > 0 ? (
            purchaseDetails.map((item: any) => (
              <PurchaseDetails key={item?.id} item={item} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center my-16">
              <p className="text-2xl text-center font-semibold text-gray-500">
                No Purchase Orders found.
              </p>
              <p className="text-center text-gray-400 mt-2">
                You haven't made any purchases yet. Start shopping to see your
                orders here!
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default PurchasePage;
