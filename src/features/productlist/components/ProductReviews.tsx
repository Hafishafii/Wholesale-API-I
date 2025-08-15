// components/ProductReviews.tsx
import React from "react";

interface Review {
  id?: number;
  user?: string;
  comment?: string;
  rating?: number;
  date?: string;
  lastSeenWorking?: boolean;
}

interface Props {
  reviews: Review[];
  newReview: { user: string; comment: string; rating: number; lastSeenWorking: boolean };
  setNewReview: (n: any) => void;
  onSubmitReview: () => void;
}

const ProductReviews: React.FC<Props> = ({ reviews, newReview, setNewReview, onSubmitReview }) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold">Ratings & Reviews</h3>
      <p className="text-green-600 text-sm mt-1">★★★★☆ 4.5 from {reviews.length} reviews</p>

      <div className="border p-4 rounded-md mt-4 bg-gray-50 space-y-2">
        <h4 className="font-semibold text-sm">Write a Review</h4>
        <input type="text" placeholder="Your name" value={newReview.user}
          onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
          className="w-full border px-3 py-2 rounded text-sm" />
        <textarea placeholder="Share your experience..." value={newReview.comment}
          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
          className="w-full border px-3 py-2 rounded text-sm resize-none" rows={3} />
        <div className="flex items-center gap-1 text-yellow-500 text-lg">
          {[1,2,3,4,5].map((star) => (
            <button key={star} onClick={() => setNewReview({ ...newReview, rating: star })}
              className={newReview.rating >= star ? "text-yellow-500" : "text-gray-300"}>★</button>
          ))}
        </div>
        <label className="text-sm flex items-center gap-2">
          <input type="checkbox" checked={newReview.lastSeenWorking}
            onChange={(e) => setNewReview({ ...newReview, lastSeenWorking: e.target.checked })} />
          Mark as "Last Seen Working"
        </label>
        <button onClick={onSubmitReview} className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">Submit Review</button>
      </div>

      <div className="mt-6 space-y-4">
        {reviews.length === 0 ? <p className="text-sm text-gray-500">No reviews yet.</p> :
          reviews.map((r: any) => (
            <div key={r.id} className="border-t pt-4">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-sm">{r.user || "Anonymous"}</p>
                <p className="text-yellow-500 text-sm">★ {r.rating}</p>
              </div>
              <p className="text-sm text-gray-700 mt-1">{r.comment}</p>
              <p className="text-xs text-gray-500 mt-1">{r.date ? new Date(r.date).toLocaleDateString() : ""}</p>
              {r.lastSeenWorking && <span className="inline-block mt-1 text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">✅ Last Seen Working</span>}
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default ProductReviews;
