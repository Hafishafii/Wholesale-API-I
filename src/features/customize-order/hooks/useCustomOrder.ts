import { useState } from "react";
import { createCustomOrder } from "../api/customOrderService";
import type { CustomOrderResponse } from "../types";
import { useUser } from "../../../hooks/useUser";

interface UseCustomOrderReturn {
  isLoading: boolean;
  error: string | null;
  success: boolean;
  orderData: CustomOrderResponse | null;
  submitOrder: (formData: FormDataProps) => Promise<void>;
  resetState: () => void;
}

interface FormDataProps {
  name: string;
  email: string;
  phone: string;
  productType: string;
  customizationOption: string;
  selectedColor: string | null;
  customColor: string;
  isUsingCustomColor: boolean;
  pattern: string;
  selectedSizes: string[];
  quantity: string;
  date: string;
  instructions: string;
  colorImageFiles: File[];
  sampleImageFiles: File[];
  budget?: number;
  brandLabel?: boolean;  
  isUrgent?: boolean;
}

export const useCustomOrder = (): UseCustomOrderReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [orderData, setOrderData] = useState<CustomOrderResponse | null>(null);

  const { user } = useUser();

  const submitOrder = async (formData: FormDataProps) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    setOrderData(null);

    try {
      if (!user) {
      }

      // Create FormData for multipart/form-data
      const fd = new FormData();

      // Text fields
      fd.append("name", formData.name);
      fd.append("email", formData.email);
      fd.append("phone", formData.phone);
      fd.append("product_type", formData.productType.toLowerCase());
      fd.append("fabric_type", formData.customizationOption.toLowerCase());
      fd.append(
        "color_preferences",
        JSON.stringify({
          primary: formData.isUsingCustomColor
            ? formData.customColor
            : formData.selectedColor || "",
          secondary: "",
        })
      );
      
      fd.append("style_pattern", formData.pattern.toLowerCase());

      // Sizes
      formData.selectedSizes.forEach(size => fd.append("size", size));

      // Quantity
      fd.append("quantity", formData.quantity);

      // Date formatting
      fd.append(
        "preferred_delivery_date",
        (() => {
          if (formData.date && formData.date.includes("/")) {
            const [month, day, year] = formData.date.split("/");
            return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
          }
          return formData.date;
        })()
      );

      // Optional budget
      if (formData.budget) {
        fd.append("budget", String(formData.budget));
      }
      fd.append("brand_label", formData.brandLabel ? "true" : "false");
      fd.append("is_urgent", formData.isUrgent ? "true" : "false");


      // Extra instructions
      fd.append("additional_instructions", formData.instructions);

      // User
      fd.append("user", "2");

      formData.sampleImageFiles.forEach(file => {
        fd.append("sample_designs", file); // ✅ exact match
      });
      
      // Append color reference images
      formData.colorImageFiles.forEach(file => {
        fd.append("color_reference_images", file); // ✅ exact match
      });

      // Call API
   

      // Send request
      const response = await createCustomOrder(fd);

      setOrderData(response);
      setSuccess(true);
    } catch (err: any) {
      console.error("❌ Error in submitOrder:", err);
      console.error("❌ Error response:", err?.response);
      console.error("❌ Error data:", err?.response?.data);

      if (err?.response?.status === 401) {
        setError("Please log in to submit a custom order");
      } else if (err?.response?.status === 403) {
        setError("You don't have permission to submit custom orders");
      } else if (err?.response?.status === 422) {
        setError("Please check your form data and try again");
      } else {
        const errorMessage =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.response?.data?.detail ||
          err?.message ||
          "Something went wrong while submitting your order";
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setIsLoading(false);
    setError(null);
    setSuccess(false);
    setOrderData(null);
  };

  return {
    isLoading,
    error,
    success,
    orderData,
    submitOrder,
    resetState,
  };
};
