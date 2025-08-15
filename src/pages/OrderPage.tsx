import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import OrderCard from "../features/orders/components/OrderCard";
import { useOrders } from "../features/orders/hooks/useOrders";
import type { RootState } from "../store/type";
import HeaderLayout from "../components/layouts/HeaderLayout";
import Spinner from "../components/common/Spinner";

const OrdersPage: React.FC = () => {
  const { loading } = useOrders(); // Assume useOrders returns loading state
  const orders = useSelector((state: RootState) => state.orders.orders);

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <HeaderLayout>
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">My Orders</h1>

          {loading ? (
            <div className="min-h-[300px] flex items-center justify-center">
              <Spinner />
            </div>
          ) : orders.length === 0 ? (
            <div className="min-h-[300px] flex flex-col items-center justify-center">
              <p className="text-gray-500 text-sm font-medium">No orders found.</p>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-4">
                {currentOrders.map((order) => (
                  <Link
                    key={`${order.id}-${order.productId}`}
                    to={`/orders/${order.id}/${order.productId}`}
                    className="block"
                  >
                    <OrderCard rating={order.rating ?? 0} order={order} />
                  </Link>
                ))}
              </div>

              <div className="flex justify-center items-center mt-6 gap-4">
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Previous
                </button>
                <span className="text-gray-700 font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </HeaderLayout>
  );
};

export default OrdersPage;
