import { useState } from "react";
import type { OrderDetails } from "../types";
import { Input } from "../../../../components/ui/input";
import { useNavigate } from "react-router-dom";
import api from "../../../../lib/api"; // axios instance
import { Button } from "../../../../components/ui/button";

type Props = {
  order: OrderDetails;
};

const OrderDetailsForm = ({ order }: Props) => {
  const [selectedStatus, setSelectedStatus] = useState(order.status);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isStatusFinal =
    order.status === "Accepted" || order.status === "Rejected";

  const handleUpdateStatus = async () => {
    if (isStatusFinal) return;
    setLoading(true);

    try {
      const endpoint =
        selectedStatus === "Rejected"
          ? `/orders/order/${order._id}/cancel/`
          : `/orders/order/${order._id}/update_status/`;

      await api.patch(
        endpoint,
        { status: selectedStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        }
      );

      setTimeout(() => {
        navigate("/admin/orders");
      }, 500);
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setLoading(false);
    }
  };

  const hasCustomization =
    order.customization?.fabric ||
    order.customization?.color ||
    order.customization?.colorReferenceImg;

  const hasPatternStyle = order.patternStyle || order.sampleImage;
  const hasBranding = order.branding;
  const hasQuantity = order.quantity || order.bulkOrder;

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Order Details</h1>

      {/* Customer Info */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-5 pb-3 border-b border-gray-200">
          Customer Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input value={order.customerName || ""} disabled />
          <Input value={order.email || ""} disabled />
          <Input value={order.phone || ""} disabled />
        </div>
      </div>

      {/* Order Info */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-5 pb-3 border-b border-gray-200">
          Order Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            value={order.totalPrice ? `₹${order.totalPrice}` : ""}
            disabled
          />
          <Input
            value={
              order.orderedAt
                ? new Date(order.orderedAt).toLocaleString()
                : ""
            }
            disabled
          />
        </div>
      </div>

      {/* Product Type */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-5 pb-3 border-b border-gray-200">
          Product Type
        </h2>
        <div className="flex gap-4">
          {["Sarees", "Kurtas", "Others"].map((type) => {
            const isSelected = order.productType === type;
            return (
              <label
                key={type}
                className={`flex items-center gap-3 px-5 py-2 rounded-full border text-sm cursor-pointer ${
                  isSelected
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-100 text-gray-600 border-gray-300"
                }`}
              >
                <input type="radio" checked={isSelected} disabled className="hidden" />
                {type}
              </label>
            );
          })}
        </div>
      </div>

      {/* Customization */}
      {hasCustomization && (
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-5 pb-3 border-b border-gray-200">
            Customization Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {order.customization?.fabric && (
              <Input value={order.customization.fabric} disabled />
            )}
            {(order.customization?.color ||
              order.customization?.colorReferenceImg) && (
              <div className="flex items-center gap-5 mt-2">
                {order.customization?.color && (
                  <div
                    className="w-10 h-10 rounded-full border-2 border-gray-300"
                    style={{
                      backgroundColor: order.customization.color || "transparent",
                    }}
                  />
                )}
                {order.customization?.colorReferenceImg && (
                  <img
                    src={order.customization.colorReferenceImg}
                    alt="Color ref"
                    className="w-20 h-20 object-cover rounded border"
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pattern Style */}
      {hasPatternStyle && (
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-5 pb-3 border-b border-gray-200">
            Style & Pattern
          </h2>
          {order.patternStyle && <Input value={order.patternStyle} disabled />}
          {order.sampleImage && (
            <img
              src={order.sampleImage}
              alt="Sample pattern"
              className="w-28 h-28 object-cover rounded border mt-2"
              referrerPolicy="no-referrer"
            />
          )}
        </div>
      )}

      {/* Branding */}
      {hasBranding && (
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={order.branding || false}
              disabled
            />
            <span className="text-sm">Custom branding included</span>
          </label>
        </div>
      )}

      {/* Quantity */}
      {hasQuantity && (
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
          {order.quantity && <Input type="number" value={order.quantity} disabled />}
          {order.bulkOrder && (
            <label className="flex items-center gap-3">
              <input type="checkbox" checked={order.bulkOrder || false} disabled />
              <span className="text-sm">Bulk Order (50+)</span>
            </label>
          )}
        </div>
      )}

      {/* Notes */}
      {order.notes && (
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
          <textarea
            value={order.notes}
            disabled
            className="w-full border border-gray-300 p-4 rounded bg-gray-50 text-sm h-40"
          />
        </div>
      )}

      {/* Shipping Address */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
        <p>{order.customerName}</p>
        <p>{order.phone}</p>
        <p>{order.address}</p>
        <p>{order.locality}</p>
        <p>
          {order.city}, {order.state} - {order.pincode}
        </p>
        {order.landmark && <p>Landmark: {order.landmark}</p>}
      </div>

      {/* Order Items */}
      {order.items && order.items.length > 0 && (
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
          <table className="w-full text-sm border">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-2 text-left">Image</th>
                <th className="p-2 text-left">Product</th>
                <th className="p-2 text-left">Color</th>
                <th className="p-2 text-left">Size</th>
                <th className="p-2 text-left">Quantity</th>
                <th className="p-2 text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-2">
                    {item.variant?.images?.[0]?.image && (
                      <img
                        src={item.variant.images[0].image}
                        alt="product"
                        className="w-16 h-16 object-cover"
                      />
                    )}
                  </td>
                  <td className="p-2">{item.productName}</td>
                  <td className="p-2">{item.variant?.color || "-"}</td>
                  <td className="p-2">{item.variant?.size || "-"}</td>
                  <td className="p-2">{item.quantity}</td>
                  <td className="p-2">₹{item.priceAtPurchase}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Status Update */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
        <select
          value={selectedStatus}
          onChange={(e) =>
            setSelectedStatus(e.target.value as OrderDetails["status"])
          }
          disabled={isStatusFinal || loading}
          className="border rounded px-3 py-2 mr-4"
        >
          <option value="Pending">Pending Review</option>
          <option value="Accepted">Order Accepted</option>
          <option value="Rejected">Order Rejected</option>
        </select>

        <Button
          onClick={handleUpdateStatus}
          disabled={isStatusFinal || loading}
          className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300`}
        >
          {loading
            ? "Updating..."
            : isStatusFinal
            ? "Status Finalized"
            : "Update Status"}
        </Button>

      </div>

    </div>
  );
};

export default OrderDetailsForm;
