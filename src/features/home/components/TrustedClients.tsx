import { useState, useEffect } from "react";
import api from "../../../lib/api";

const StarRow = ({ rating = 5, onChange }: { rating?: number; onChange?: (value: number) => void }) => (
  <div className="flex mb-2">
    {[...Array(5)].map((_, i) => {
      const index = i + 1;
      return (
        <svg
          key={i}
          className={`w-5 h-5 cursor-pointer ${index <= rating ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          onClick={() => onChange && onChange(index)}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
        </svg>
      );
    })}
  </div>
);

const TrustedClients = () => {
  const [showModal, setShowModal] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [newReview, setNewReview] = useState("");
  const [newClient, setNewClient] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [reviews, setReviews] = useState<{ rating: number; review: string; client: string }[]>([]);
  const [errors, setErrors] = useState({ client: "", review: "", rating: "" });
  const [loading, setLoading] = useState(false);

  const reviewsToShow = showAll ? reviews : reviews.slice(0, 2);

  

  // Fetch all reviews on component mount
useEffect(() => {
  const fetchReviews = async () => {
    try {
      const response = await api.get("/review/company-reviews/");
      // Map over response.data.results instead of response.data
      const formattedReviews = response.data.results.map((r: any) => ({
        rating: r.rating,
        review: r.comment,
        client: r.reviewer_name || "Anonymous", // fallback if reviewer_name missing
      }));

      setReviews(formattedReviews);
    } catch (error: any) {
      console.error("Error fetching reviews:", error.response?.data || error.message);
    }
  };

  fetchReviews();
}, []);


  const handleSubmit = async () => {
    const newErrors = { client: "", review: "", rating: "" };
    let hasError = false;

    if (!newClient.trim()) {
      newErrors.client = "Name is required";
      hasError = true;
    }
    if (!newReview.trim()) {
      newErrors.review = "Review is required";
      hasError = true;
    }
    if (newRating === 0) {
      newErrors.rating = "Please select a rating";
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    setLoading(true);
    try {
      const response = await api.post("/review/company-reviews/create/", {
        rating: newRating,
        comment: newReview,
      });

      setReviews([
        ...reviews,
        {
          rating: response.data.rating,
          review: response.data.comment,
          client: newClient,
        },
      ]);

      setNewReview("");
      setNewClient("");
      setNewRating(0);
      setErrors({ client: "", review: "", rating: "" });
      setShowModal(false);
    } catch (error: any) {
      console.error("Failed to submit review:", error.response?.data || error.message);
      alert("Failed to submit review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f5f6fa] py-10 md:py-14 px-4 flex flex-col items-center w-full">
  <div className="w-full max-w-6xl flex flex-col md:flex-row md:justify-between items-center mb-6 md:mb-10">
    <h2 className="text-2xl md:text-4xl font-bold text-black text-center w-full md:w-auto">
      Trusted Clients
    </h2>
    <div className="flex flex-wrap gap-4 mt-4 md:mt-0 justify-center md:justify-start">
      <button
        onClick={() => setShowAll(!showAll)}
        className="text-base md:text-lg text-black font-semibold hover:underline"
      >
        {showAll ? "View Less" : "View More"}
      </button>
      <button
        onClick={() => setShowModal(true)}
        className="text-base md:text-lg text-white font-semibold bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Review
      </button>
    </div>
  </div>

  <div className="flex flex-wrap gap-6 justify-center w-full max-w-6xl">
    {reviewsToShow.map((t, i) => (
      <div
        key={i}
        className="bg-white rounded-xl shadow-md p-5 md:p-8 border border-gray-300 w-full sm:w-[45%] md:w-[30%] min-w-[240px]"
      >
        <StarRow rating={t.rating} />
        <p className="text-gray-900 text-sm md:text-base mb-3 md:mb-4 break-words">“{t.review}”</p>
        <p className="text-black text-sm md:text-base font-bold truncate">— {t.client}</p>
      </div>
    ))}
  </div>

  {showModal && (
    <div className="fixed inset-0  bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50 px-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={() => setShowModal(false)}
        >
          ✕
        </button>
        <h3 className="text-lg md:text-xl font-bold mb-4 text-center">Add a Review</h3>
        <StarRow rating={newRating} onChange={setNewRating} />
        {errors.rating && <p className="text-red-500 text-sm mb-2">{errors.rating}</p>}
        <input
          type="text"
          placeholder="Your Name"
          value={newClient}
          onChange={(e) => setNewClient(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full mb-2"
        />
        {errors.client && <p className="text-red-500 text-sm mb-2">{errors.client}</p>}
        <textarea
          placeholder="Your Review"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full mb-2"
        />
        {errors.review && <p className="text-red-500 text-sm mb-2">{errors.review}</p>}
        <button
          onClick={handleSubmit}
          className={`bg-blue-600 text-white px-4 py-2 rounded w-full mt-3 ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  )}
</div>

  );
};

export default TrustedClients;
