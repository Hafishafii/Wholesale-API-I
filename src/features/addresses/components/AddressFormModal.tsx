import React, { useEffect, useState } from "react";
import { useAddressForm } from "../hooks/useAddressForm";
import type { Address } from "../../../types/address";
import Swal from "sweetalert2";

interface Props {
  isOpen: boolean;
  initial?: Address | null;
  onClose: () => void;
  onSave: (data: Omit<Address, "id" | "user">) => Promise<void>;
}

const AddressFormModal: React.FC<Props> = ({
  isOpen,
  initial,
  onClose,
  onSave,
}) => {
  const { formData, setFormData, handleChange, validate, errors } =
    useAddressForm(initial || undefined);

  const [backendErrors, setBackendErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initial) {
      setFormData({
        name: initial.name || "",
        phone: initial.phone || "",
        pincode: initial.pincode || "",
        locality: initial.locality || "",
        address: initial.address || "",
        city: initial.city || "",
        state: initial.state || "",
        address_type: initial.address_type || "home",
      });
    }
  }, [initial, setFormData]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    setBackendErrors({});
    setGeneralError(null);

    if (!validate()) return;

    setSaving(true);
    try {
      await onSave(formData);
      Swal.fire("Success", "Address saved successfully!", "success");
      onClose();
    } catch (error: any) {
      const data = error.response?.data;
      if (data) {
        // field-level errors
        if (typeof data === "object") {
          const fieldErrs: Record<string, string> = {};
          Object.keys(data).forEach((key) => {
            if (Array.isArray(data[key])) {
              fieldErrs[key] = data[key][0];
            }
          });
          setBackendErrors(fieldErrs);
        }
        // non-field/general error
        if (data.detail) {
          setGeneralError(data.detail);
        }
      } else {
        setGeneralError("Something went wrong. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">
            {initial ? "Edit Address" : "Add Address"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        {/* General error */}
        {generalError && (
          <p className="text-red-600 text-sm mb-4">{generalError}</p>
        )}

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Full Name", name: "name" },
            { label: "Phone Number", name: "phone" },
            { label: "Pincode", name: "pincode" },
            { label: "Locality", name: "locality" },
            { label: "Address", name: "address" },
            { label: "City", name: "city" },
            { label: "State", name: "state" },
          ].map((field) => (
            <div
              key={field.name}
              className={["address"].includes(field.name) ? "md:col-span-2" : ""}
            >
              <label className="block text-sm mb-1">{field.label}</label>
              <input
                name={field.name}
                value={(formData as any)[field.name] || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              {errors[field.name] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[field.name]}
                </p>
              )}
              {backendErrors[field.name] && (
                <p className="text-red-500 text-sm mt-1">
                  {backendErrors[field.name]}
                </p>
              )}
            </div>
          ))}

          {/* Address Type */}
          <div>
            <label className="block text-sm mb-1">Address Type</label>
            <select
              name="address_type"
              value={formData.address_type}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="home">Home</option>
              <option value="work">Work</option>
              <option value="other">Other</option>
            </select>
            {errors.address_type && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address_type}
              </p>
            )}
            {backendErrors.address_type && (
              <p className="text-red-500 text-sm mt-1">
                {backendErrors.address_type}
              </p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
            disabled={saving}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`px-4 py-2 rounded text-white ${
              saving ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressFormModal;
