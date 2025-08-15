import { useState } from "react";
import { IoStar, IoStarOutline } from "react-icons/io5";
import RatingModal from "./RatingModal";
import useReview from "../hooks/useReview";

const PurchaseDetails = ({ item }: any) => {
  const [hover, setHover] = useState(0);

  const {
    rating,
    setRating,
    comment,
    setComment,
    handleReview,
    isLoading,
    isOpen,
    setIsOpen,
  } = useReview();

  const handleSubmit = () => {
    handleReview(item?.variant_detail?.id);
  };
  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="p-4 flex gap-2 bg-gray-200 rounded-md"
      >
        <img
          src={item?.variant_detail?.images[0]}
          alt="product image"
          className="w-34 h-34 shadow-lg p-2  object-cover rounded-lg"
        />
        <div className="flex flex-col justify-evenly  p-2 w-full">
          <p className="text-xl mb-4 break-words">{item?.product_name} </p>
          <p className="text-xl mb-4 break-words">
            {item?.variant_detail?.wholesale_price} /-{" "}
          </p>
          <div className="flex gap-2 text-yellow-500">
            {Array(5)
              .fill(0)
              .map((_, i) =>
                i < rating ? (
                  <IoStar key={i} size={24} />
                ) : (
                  <IoStarOutline key={i} size={24} />
                )
              )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <RatingModal
          setComment={setComment}
          comment={comment}
          hover={hover}
          setHover={setHover}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          rating={rating}
          setRating={setRating}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  );
};

export default PurchaseDetails;
