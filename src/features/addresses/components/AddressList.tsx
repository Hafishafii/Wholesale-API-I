import React from "react";
import type { Address } from "../../../types/address";

interface Props {
  addresses: Address[];
  onAdd: () => void;
  onEdit: (address: Address) => void;
  onDelete: (id: number) => void;
  onSelect?: (id: number) => void; // optional
  deletingId?: number | null; // NEW
}

const AddressList: React.FC<Props> = ({
  addresses,
  onAdd,
  onEdit,
  onDelete,
  onSelect,
  deletingId,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Add address card */}
      <div
        onClick={onAdd}
        className="border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer p-6"
      >
        <span className="text-4xl">+</span>
        <p className="mt-2">Add Address</p>
      </div>

      {/* Address cards */}
      {addresses.map((addr) => (
        <div key={addr.id} className="border rounded-lg p-4 shadow-sm relative">
          <p className="font-semibold">{addr.name}</p>
          <p>
            {addr.address}, {addr.locality}
          </p>
          <p>
            {addr.city}, {addr.state}
          </p>
          <p>Pincode: {addr.pincode}</p>
          <p>Phone: {addr.phone}</p>
          {addr.address_type && (
            <p className="italic">({addr.address_type})</p>
          )}

          {/* Actions row */}
          <div className="flex gap-2 mt-2 text-sm">
            <button onClick={() => onEdit(addr)} className="text-blue-600">
              Edit
            </button>
            <span>|</span>
            <button
              onClick={() => onDelete(addr.id)}
              disabled={deletingId === addr.id}
              className={`text-red-600 ${
                deletingId === addr.id
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:underline"
              }`}
            >
              {deletingId === addr.id ? "Removing..." : "Remove"}
            </button>
          </div>

          {/* Select button */}
          <div className="mt-3 flex justify-end">
            <button
              onClick={() => onSelect?.(addr.id)}
              disabled={!onSelect}
              className={`px-3 py-1 text-xs rounded ${
                onSelect
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Select
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddressList;
