export type Product = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  mainImage: string;
  thumbnails: string[];
  price: number;
  originalPrice: number;
  rating: number;
  fabric: string;
  sleeve: string;
  pattern: string;
  collar: string;
  color: string;
  packOf: number;
  colorVariants: string[]; 
};

export const dummyProducts: Product[] = [
  {
    id: "1",
    title: "VeBNoR Solid Casual Shirt",
        subtitle: "from VeBNoR", // ✅ Add this line
    description: "Men's Regular Fit Spread Collar Cotton Shirt",
    mainImage: "https://wittee.in/wp-content/uploads/2022/03/front-622fd2d6f0f00-Mustard_Yellow_S_Men_Round.jpg.webp",
    thumbnails: [
        "https://wittee.in/wp-content/uploads/2022/03/front-622fd2d6f0f00-Mustard_Yellow_S_Men_Round.jpg.webp",
      "https://wittee.in/wp-content/uploads/2022/03/front-622fd2cfe6041-Melange_Grey_S_Men_Round.jpg",
      "https://wittee.in/wp-content/uploads/2022/03/front-622fd2d8e3af8-Butter_Yellow_S_Men_Round.jpg",
      "https://wittee.in/wp-content/uploads/2022/03/front-622fd2d8e3af8-Butter_Yellow_S_Men_Round.jpg.webp",
            "https://wittee.in/wp-content/uploads/2022/03/front-622fd2d8e3af8-Butter_Yellow_S_Men_Round.jpg.webp"

    ],
    price: 2000,
    originalPrice: 2999,
    rating: 4,
    fabric: "Cotton Blend",
    sleeve: "Half Sleeve",
    pattern: "Solid",
    collar: "Spread",
    color: "Maroon",
    packOf: 1,
    colorVariants: ["#000000", "#FF0000", "#006400"], // Black, Red, Green

  },
  // Add more products as needed
];
