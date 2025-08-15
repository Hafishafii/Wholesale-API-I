import StackHeaderLayout from "../components/layouts/StackHeaderLayout";
import Wishlist from "../features/wishlist/components/Wishlist";

export default function WishlistPage() {
  return (
    <StackHeaderLayout title="My Wishlist">
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-5xl mx-auto pt-6 px-4">
        <Wishlist />
      </main>
    </div>
    </StackHeaderLayout>
  );
}
