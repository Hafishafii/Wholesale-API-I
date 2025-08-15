import React from "react";

interface Props {
  images: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

const PLACEHOLDER_IMAGE = "https://ktr-export-backend.onrender.com/static_images/placeholder.png"; // Your backend placeholder image URL

const ProductImageThumbnails: React.FC<Props> = ({ images, selectedIndex, onSelect }) => {
  // Handle image loading error fallback
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = PLACEHOLDER_IMAGE;
  };
  // Optional: handle keyboard select for accessibility
  const handleKeyDown = (e: React.KeyboardEvent<HTMLImageElement>, idx: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(idx);
    }
  };

  return (
    <div className="md:w-2/4 grid grid-cols-2 gap-4">
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`Product thumbnail ${idx + 1}`}
          className={`w-full h-24 object-cover border rounded-md cursor-pointer ${
            selectedIndex === idx ? "border-blue-600" : "border-gray-300"
          }`}
          onClick={() => onSelect(idx)}
          onError={handleImageError}
          tabIndex={0}
          aria-selected={selectedIndex === idx}
          role="button"
          onKeyDown={(e) => handleKeyDown(e, idx)}
        />
      ))}
    </div>
  );
};

export default ProductImageThumbnails;
