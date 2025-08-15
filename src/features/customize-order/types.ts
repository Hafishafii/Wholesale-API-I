export interface CustomOrderRequest {
  name: string;
  email: string;
  phone: string;
  product_type: number; // Changed to number for primary key
  fabric_type: string;
  color_preferences: string; // Changed to string (JSON)
  color_reference_image: File; // Changed to File
  style_pattern: string;
  sample_design: File; // Changed to File
  size: string;
  quantity: number;
  preferred_delivery_date: string;
  budget: number;
  additional_instructions: string;
}

export interface CustomOrderResponse {
  id: string;
  status: 'pending' | 'approved' | 'rejected' | 'in_production' | 'completed';
  message: string;
  order_number?: string;
}

export interface CustomOrderFormData {
  name: string;
  email: string;
  phone: string;
  productType: string;
  customizationOption: string;
  selectedColor: string | null;
  customColor: string;
  pattern: string;
  selectedSizes: string[];
  quantity: string;
  date: string;
  instructions: string;
  colorImageFiles: File[];
  sampleImageFiles: File[];
  budget?: number;
}
