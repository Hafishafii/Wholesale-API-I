import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { OrderRequest } from "../types";
import { StatusBadge } from "./StatusBadge";
import { Skeleton } from "../../../../components/ui/skeleton";

const allStatuses = [
  "All",
  "Pending",
  "In Review",
  "Approved",
  "Rejected",
  "In production",
  "Shipped",
  "Delivered",
];

interface Props {
  orders: OrderRequest[];
  loading: boolean;
  onFilterChange: (filters: { status: string; startDate: string; endDate: string }) => void;
}

export const OrderRequestTable = ({ orders, loading, onFilterChange }: Props) => {
  const [filteredOrders, setFilteredOrders] = useState<OrderRequest[]>([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();

  // Apply filtering locally
  useEffect(() => {
    const statusMap: Record<string, string[]> = {
      All: [],
      Pending: ["pending"],
      "In Review": ["in review"],
      Approved: ["approved", "accepted"],
      Rejected: ["rejected", "declined", "cancelled"],
      "In production": ["in production", "processing"],
      Shipped: ["shipped"],
      Delivered: ["delivered"],
    };

    let filtered = [...orders];

    if (statusFilter !== "All") {
      const matchValues = statusMap[statusFilter] || [];
      filtered = filtered.filter((o) =>
        matchValues.includes(o.status?.toLowerCase() || "")
      );
    }

    if (startDate) {
      const start = new Date(startDate);
      filtered = filtered.filter((o) => {
        if (!o.date) return false;
        try {
          const orderDate = new Date(o.date);
          return orderDate >= start;
        } catch {
          return false;
        }
      });
    }

    if (endDate) {
      const end = new Date(endDate);
      filtered = filtered.filter((o) => {
        if (!o.date) return false;
        try {
          const orderDate = new Date(o.date);
          return orderDate <= end;
        } catch {
          return false;
        }
      });
    }

    setFilteredOrders(filtered);
    onFilterChange({ status: statusFilter, startDate, endDate });
  }, [statusFilter, startDate, endDate, orders, onFilterChange]);

  return (
    <>
      {/* Filter UI */}
      <div className="flex flex-wrap gap-4 mb-4">
        <select
          className="border px-3 py-2 rounded-md text-sm"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          {allStatuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <div className="flex gap-2 items-center text-sm">
          <label>Start Date:</label>
          <input
            type="date"
            className="border px-2 py-1 rounded-md"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="flex gap-2 items-center text-sm">
          <label>End Date:</label>
          <input
            type="date"
            className="border px-2 py-1 rounded-md"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-[800px] w-full bg-white rounded-xl shadow">
          <thead className="bg-gray-100">
            <tr className="text-left text-sm text-gray-700">
              <th className="p-3">Request ID</th>
              <th className="p-3">Date</th>
              <th className="p-3">Customer Name</th>
              <th className="p-3">Contact Info</th>
              <th className="p-3">Product & Fabric</th>
              <th className="p-3">Color & Quantity</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading && orders.length === 0
              ? Array.from({ length: 5 }).map((_, idx) => (
                  <tr key={`skeleton-${idx}`} className="border-b">
                    {Array.from({ length: 8 }).map((__, colIdx) => (
                      <td className="p-3" key={`skeleton-cell-${idx}-${colIdx}`}>
                        <Skeleton className="h-4 w-full rounded" />
                      </td>
                    ))}
                  </tr>
                ))
              : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-4 text-center text-gray-500">
                    No orders found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order, idx) => (
                  <tr
                    key={`${order.id}-${idx}`} // ✅ Guaranteed unique key
                    className="border-b hover:bg-gray-50 text-sm"
                  >
                    <td className="p-3">{order.id}</td>
                    <td className="p-3">{order.date || "N/A"}</td>
                    <td className="p-3">{order.customerName}</td>
                    <td className="p-3">{order.contact}</td>
                    <td className="p-3">{`${order.product}, ${order.fabric}`}</td>
                    <td className="p-3">{`${order.color}, ${order.quantity}`}</td>
                    <td className="p-3">
                      <StatusBadge status={order.status} />
                    </td>
                    <td
                      className="p-3 text-right text-blue-600 font-medium cursor-pointer"
                      onClick={() => navigate(`/admin/orders/${order.id}`)}
                    >
                      View
                    </td>
                  </tr>
                ))
              )}
          </tbody>
        </table>
      </div>
    </>
  );
};
