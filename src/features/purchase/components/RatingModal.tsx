import { IoStar, IoStarOutline } from "react-icons/io5"
interface RatingModalProps {
  setComment: React.Dispatch<React.SetStateAction<string>>;
  comment: string;
  hover: number;
  setHover: React.Dispatch<React.SetStateAction<number>>;
  handleSubmit: () => void;
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}
const RatingModal = ({ setComment, comment, hover, setHover, handleSubmit, rating, setRating, setIsOpen, isLoading }: RatingModalProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-center">Rate your purchase</h2>

                <div className="flex justify-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                        >
                            {star <= (hover || rating) ? (
                                <IoStar size={32} className="text-yellow-400" />
                            ) : (
                                <IoStarOutline size={32} className="text-gray-300" />
                            )}
                        </button>
                    ))}
                </div>

                <textarea
                    className="w-full border rounded-md p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                    rows={4}
                    placeholder="Write your feedback..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>

                <div className="mt-4 flex justify-end gap-2">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        disabled={rating === 0 || comment.trim() === "" || isLoading}
                    >
                        {isLoading ? "Submitting" : "submit"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RatingModal