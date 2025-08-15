import React, { useEffect, useState } from "react";
import { FaDownload, FaHome, FaUser, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../../lib/api";
import type { OrderDetailsType } from "../types/Ordertypes";

const statusSteps = [
  { label: "Pending", key: "pending" },
  { label: "Order Confirmed", key: "confirmed" },
  { label: "Shipped", key: "shipped" },
  { label: "Out for Delivery", key: "out_for_delivery" },
  { label: "Delivered", key: "delivered" },
] as const;

type OrderStatus = typeof statusSteps[number]["key"];

const orderStatuses: Record<OrderStatus, number> = {
  pending: 0,
  confirmed: 1,
  shipped: 2,
  out_for_delivery: 3,
  delivered: 4,
};

type AddressType = {
  id: number;
  name: string;
  phone: string;
  pincode: string;
  locality: string;
  address: string;
  city: string;
  state: string;
  landmark: string;
  alternate_phone: string;
  is_default: boolean;
  created_at: string;
  user: number;
};

type ReviewType = {
  id: number;
  user: number;
  reviewer_name: string;
  rating: number;
  product: number;
  comment: string;
  created_at: string;
  reply?: string | null;
  reply_at?: string | null;
};

type Props = {
  order: OrderDetailsType;
};

const OrderDetails: React.FC<Props> = ({ order }) => {
  const [address, setAddress] = useState<AddressType | null>(null);
  const [currentStatus] = useState<OrderStatus>(
    (order.status as OrderStatus) ?? "pending"
  );
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [submittedReview, setSubmittedReview] = useState<ReviewType | null>(
    null
  );
  const [invoiceMessage, setInvoiceMessage] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await api.get("/orders/addresses/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (
          Array.isArray(response.data.results) &&
          response.data.results.length > 0
        ) {
          setAddress(response.data.results[0]);
        } else if (Array.isArray(response.data) && response.data.length > 0) {
          setAddress(response.data[0]);
        } else {
          setAddress(null);
        }
      } catch {
        setAddress(null);
      }
    };
    if (token) fetchAddress();
  }, [token]);

  const normalizeStatus = (status?: string): OrderStatus => {
    if (!status) return "pending";
    return status.toLowerCase().replace(/\s+/g, "_") as OrderStatus;
  };

  const isStepCompleted = (stepKey: OrderStatus) => {
    const normalizedCurrent = normalizeStatus(currentStatus);
    return orderStatuses[stepKey] <= orderStatuses[normalizedCurrent];
  };

  const handleReviewSubmit = async () => {
    if (!review.trim() || rating === 0) {
      setInvoiceMessage("Please provide both rating and review comment.");
      return;
    }
    try {
      const payload = {
        rating,
        product: order.productId,
        comment: review.trim(),
      };
      const response = await api.post("/review/reviewcreate/", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubmittedReview(response.data);
      setReview("");
      setRating(0);
    } catch {
      setInvoiceMessage("Failed to submit review. Try again later.");
    }
  };

  const handleDownloadInvoice = async () => {
    if (!order?.id) {
      setInvoiceMessage("Order ID is missing.");
      return;
    }

    try {
      const response = await api.get(`/orders/invoice/${order.id}`, {
        responseType: "blob",
        headers: { Authorization: `Bearer ${token}` },
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice-${order.id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      setInvoiceMessage("Invoice downloaded successfully.");
    } catch (error: any) {
      if (error.response?.status === 404) {
        setInvoiceMessage("Invoice not available yet.");
      } else {
        setInvoiceMessage("Failed to download invoice. Try again later.");
      }
    }
  };

  return (
    <div className="w-full py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Order Details
        </h2>

        {/* Product Info */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <img
            src={order.image}
            alt={order.title}
            className="w-56 h-72 object-cover rounded-xl shadow-lg border border-gray-200"
          />
          <div className="flex-1 space-y-3">
            <Link
              to={`/orders/${order.id}`}
              className="text-2xl font-semibold text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
            >
              {order.title}
            </Link>
            {order.color && (
              <p className="text-gray-600 italic tracking-wide">
                Color:{" "}
                <span className="font-medium text-gray-800">{order.color}</span>
              </p>
            )}
            <p className="text-gray-700">
              <span className="font-semibold">Quantity:</span> {order.quantity}
            </p>
            <p className="mt-3 font-extrabold text-2xl text-green-700">
              ₹{order.price}{" "}
              <span className="text-base font-normal text-gray-500 align-middle">
                per piece
              </span>
            </p>
          </div>
        </div>

        {/* Tracking */}
        <div className="mt-12">
          <h4 className="text-2xl font-semibold text-gray-900 mb-6 tracking-wide">
            Order Tracking
          </h4>
          <div className="relative border-l-4 border-gray-300 pl-8 space-y-10">
            {statusSteps.map((step, idx) => {
              const completed = isStepCompleted(step.key);
              const isLast = step.key === "delivered";
              return (
                <div key={step.key} className="flex items-start group">
                  <span
                    className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ring-4 ring-white ${
                      completed
                        ? isLast
                          ? "bg-green-600 text-white ring-green-600"
                          : "bg-blue-600 text-white ring-blue-600"
                        : "bg-gray-300 text-gray-500"
                    }`}
                  >
                    {completed ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <span className="text-sm font-semibold">
                        {idx + 1}
                      </span>
                    )}
                  </span>
                  <div className="ml-6">
                    <p
                      className={`font-semibold text-lg ${
                        completed
                          ? isLast
                            ? "text-green-800"
                            : "text-blue-700"
                          : "text-gray-400"
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Review Submission */}
        <div className="mt-10">
          <p className="font-semibold text-gray-800">Rate the product</p>
          <div className="flex gap-1 text-yellow-400 mt-1">
            {[...Array(5)].map((_, i) => {
              const starNumber = i + 1;
              return (
                <FaStar
                  key={i}
                  className={`cursor-pointer ${
                    starNumber <= rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  onClick={() => setRating(starNumber)}
                />
              );
            })}
          </div>
          <div className="flex mt-2">
            <input
              className="border px-3 py-2 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Add Review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition"
              onClick={handleReviewSubmit}
            >
              Submit
            </button>
          </div>
          {submittedReview && (
            <div className="mt-3 p-3 bg-blue-50 text-sm text-blue-700 rounded-md border border-blue-200">
              ✅ Your review: "{submittedReview.comment}" (Rating:{" "}
              {submittedReview.rating}⭐)
            </div>
          )}
        </div>

        {/* Invoice Download */}
        <div className="mt-10">
          <button
            onClick={handleDownloadInvoice}
            className="flex items-center gap-2 border px-4 py-2 rounded-md hover:bg-gray-100 transition text-gray-800"
          >
            <FaDownload /> Download Invoice
          </button>
          {invoiceMessage && (
            <p className="mt-2 text-sm text-blue-600">{invoiceMessage}</p>
          )}
        </div>

        {/* Delivery Details */}
        <div className="mt-10">
          <h4 className="font-semibold text-gray-800 mb-2">Delivery Details</h4>
          {address ? (
            <>
              <p className="text-gray-700 mb-1">
                <FaHome className="inline mr-2 text-gray-600" />
                {address.name}, {address.address}, {address.locality},{" "}
                {address.city} - {address.pincode}
              </p>
              {address.landmark && (
                <p className="text-gray-700 mb-1">
                  Landmark: {address.landmark}
                </p>
              )}
              <p className="text-gray-700">
                <FaUser className="inline mr-2 text-gray-600" />
                Phone: {address.phone}
              </p>
              {address.alternate_phone && (
                <p className="text-gray-700">
                  Alternate Phone: {address.alternate_phone}
                </p>
              )}
            </>
          ) : (
            <p className="text-gray-500">No delivery address available.</p>
          )}
        </div>

        {/* Pricing Summary */}
        <div className="mt-10">
          <h4 className="font-semibold text-gray-800 mb-2">Price Details</h4>
          <p className="text-gray-700">Price Per Piece: ₹{order.price}</p>
          <p className="text-gray-700">Discount: {order.discount}%</p>
          <p className="text-gray-700">Quantity: {order.quantity}</p>
          <p className="font-bold text-xl mt-1 text-green-800">
            Total Amount: ₹{order.total}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
