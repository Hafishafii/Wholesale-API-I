import React from 'react';

type CategoryCardProps = {
  image: string;
  title: string;
  onClick?: () => void;
};

const CategoryCard: React.FC<CategoryCardProps> = ({ image, title, onClick }) => {
  return (
    <div
      className="flex flex-col items-center bg-[#efd3b6] rounded-xl shadow-lg p-3 md:p-4 w-48 md:w-64 relative cursor-pointer hover:shadow-xl transition min-h-[220px] md:min-h-[260px]"
      onClick={onClick}
    >
      {/* Notebook spiral effect */}
      <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-3 md:py-5 pl-[-8px] z-10">
        {[...Array(6)].map((_, i) => (
          <span key={i} className="relative w-3 md:w-4 h-3 md:h-4 flex items-center justify-center mb-1 md:mb-2 last:mb-0">
            <span className="absolute w-3 md:w-4 h-3 md:h-4 bg-black rounded-full"></span>
            <span className="absolute w-1.5 md:w-2 h-1.5 md:h-2 bg-[#a86b2d] rounded-full"></span>
          </span>
        ))}
      </div>
      <span className="text-xs text-gray-600 mb-1 mt-2">View all</span>
      <img src={image} alt={title} className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg mb-2 z-0" />
      <span className="font-bold text-base md:text-lg text-black mb-2">{title}</span>
    </div>
  );
};

export default CategoryCard; 