import { useState } from "react";
import type { Address } from "../../../types/address";

export const useAddressForm = (initial?: Partial<Address>) => {
  const [formData, setFormData] = useState<Omit<Address, "id" | "user">>({
    name: "",
    phone: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    address_type: "home",
    ...initial,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) newErrors.name = "Full name is required";
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (!formData.pincode) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Enter a valid 6-digit pincode";
    }

    if (!formData.locality) newErrors.locality = "Locality is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.address_type) newErrors.address_type = "Address type is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { formData, setFormData, handleChange, validate, errors };
};
