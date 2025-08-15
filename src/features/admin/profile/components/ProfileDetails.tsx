import { Skeleton } from "../../../../components/ui/skeleton";
import { useAdmin } from "../../../../hooks/useAdmin";
import type { AdminProfile } from "../types";

export const ProfileDetails = ({
  data,
}: {
  data: AdminProfile | null;
}) => {
  const { admin, loading } = useAdmin();
  if (loading) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
        <Skeleton className="h-32 w-32 rounded-full mb-6" />
        <Skeleton className="h-8 w-3/4 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-4" />
        <div className="pt-4 border-t border-gray-100">
          <Skeleton className="h-4 w-1/3 mb-2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>
    );
  }

  if (!data) return <p className="text-white">Profile not found.</p>;

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
      <img
        src={data.image}
        alt={data.name}
        className="w-32 h-32 rounded-full object-cover mb-6"
      />
      <h2 className="text-2xl font-bold text-gray-800 mb-2 capitalize">{admin?.first_name} {admin?.last_name}</h2>
      <p className="text-lg text-gray-600 mb-4">{data.role}</p>
      <div className="pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-500">Couponie</p>
        <p className="text-sm text-gray-500">Giolite</p>
      </div>
    </div>
  );
};
