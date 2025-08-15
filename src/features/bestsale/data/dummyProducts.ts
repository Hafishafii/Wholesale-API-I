import type { Product } from "../../../types/product";

export const dummyBestSaleData: Product[] = [
  {
    name: 'Banarasi Tissue Pattu Saree',
    image: '/public/saree.jpeg',
    price: 1200,
    mrp: 1500,
    rating: 4,
    review: "230 reviews",
    sizes: ["M", "L", "XL"],
    selectedSize: "L"
  },
  {
    name: 'Kerala Thiriyum Shirt',
    image: '/public/mundu.jpeg',
    price: 799,
    mrp: 999,
    rating: 5,
    review: "150 reviews",
    sizes: ["M", "L", "XL"],
    selectedSize: "M"
  },
  // Add more items here...
];
