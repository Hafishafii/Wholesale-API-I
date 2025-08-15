import type { Product } from "../../../types/product";
import type { Address } from "../../../types/shipping";
import type { Invoice } from "../../../types/invoice";

export const dummyProduct: Product = {
  name: "Premium Hoodie",
  image: "/hoodie.jpeg",
  mrp: 1999,
  price: 1299,
  review: "4.5K Reviews",
  rating: 4,
  sizes: ["S", "M", "L", "XL"],
  selectedSize: "M",
};

export const dummyAddress: Address = {
  company: "Acme Corp.",
  addressLine1: "123 Main St",
  addressLine2: "2nd Floor, Suite 45",
  city: "Bangalore",
  state: "Karnataka",
  pincode: "560001",
  country: "India",
  phone: "+91 9876543210",
  email: "user@example.com",
  gstin: "29ABCDE1234F2Z5",
};

export const dummyInvoice: Invoice = {
  number: "INV-2025-0001",
  date: "2025-07-24",
  dueDate: "2025-07-31",
};
