import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  getAllAddressesAPI,
  saveAddressAPI,
  updateAddressAPI,
  deleteAddressAPI,
} from "../features/addresses/service/addressApi";
import type { Address } from "../types/address";
import AddressFormModal from "../features/addresses/components/AddressFormModal";
import AddressList from "../features/addresses/components/AddressList";
import StackHeaderLayout from "../components/layouts/StackHeaderLayout";

const AddressesPage: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null); // NEW

  const location = useLocation();
  const navigate = useNavigate();
  const fromCheckout =
    new URLSearchParams(location.search).get("from") === "checkout";

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
      const data = await getAllAddressesAPI();
      setAddresses(data);
    } catch (error: any) {
      setErrorMsg(error.response?.data?.message || "Failed to fetch addresses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleSaveAddress = async (
    addressData: Omit<Address, "id" | "user">
  ) => {
    try {
      if (editingAddress) {
        await updateAddressAPI(editingAddress.id, addressData);
      } else {
        await saveAddressAPI(addressData);
      }
      fetchAddresses();
    } catch (error: any) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to save address",
        "error"
      );
    }
  };

const handleDeleteAddress = async (id: number) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This will delete the address permanently.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      setDeletingId(id); // start deleting
      await deleteAddressAPI(id);
      setAddresses((prev) => prev.filter((addr) => addr.id !== id));
      Swal.fire("Deleted!", "Your address has been removed.", "success");
    } catch (error: any) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to delete address",
        "error"
      );
    } finally {
      setDeletingId(null); // reset
    }
  }
};


  const handleSelectAddress = (id: number) => {
    navigate(`/checkout?addressId=${id}`);
  };

  return (
    <StackHeaderLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">My Addresses</h1>

        {errorMsg && <p className="text-red-600 mb-4">{errorMsg}</p>}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="h-40 bg-gray-200 animate-pulse rounded-lg"
                ></div>
              ))}
          </div>
        ) : (
          <AddressList
            addresses={addresses}
            onAdd={() => {
              setEditingAddress(null);
              setShowFormModal(true);
            }}
            onEdit={(address) => {
              setEditingAddress(address);
              setShowFormModal(true);
            }}
            onDelete={handleDeleteAddress}
            onSelect={fromCheckout ? handleSelectAddress : undefined}
            deletingId={deletingId} // NEW
          />
        )}

        {showFormModal && (
          <AddressFormModal
            isOpen={showFormModal}
            initial={editingAddress}
            onClose={() => {
              setShowFormModal(false);
              setEditingAddress(null);
            }}
            onSave={handleSaveAddress}
          />
        )}
      </div>
    </StackHeaderLayout>
  );
};

export default AddressesPage;
