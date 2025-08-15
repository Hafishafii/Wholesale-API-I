import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  images: string[];
  selectedIndex: number;
  onPrev: () => void;
  onNext: () => void;
}

const PLACEHOLDER_IMAGE = "https://ktr-export-backend.onrender.com/static_images/placeholder.png"; 

const ProductImageMain: React.FC<Props> = ({ images, selectedIndex, onPrev, onNext }) => {
  const src = images[selectedIndex] || images[0] || PLACEHOLDER_IMAGE;

  // Handler if image fails to load
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = PLACEHOLDER_IMAGE;
  };

  return (
    <div className="relative md:w-2/5">
      <img
        src={src}
        alt={`product image ${selectedIndex + 1}`}
        onError={handleImageError}
        className="w-full h-[450px] object-cover rounded-xl shadow-md"
      />
      {images.length > 1 && (
        <>
          <button
            onClick={onPrev}
            aria-label="Previous Image"
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={onNext}
            aria-label="Next Image"
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  );
};

export default ProductImageMain;
