export type Product = {
  name: string;
  price: number;
  mrp: number;
  rating: number;
  review: string;
  image: string;
  sizes: string[];
  selectedSize: string;
  quantity?: string;
}