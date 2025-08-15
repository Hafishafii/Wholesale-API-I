import { useEffect, useState } from "react";
import type { AdminProfile } from "../types";

export const useAdminProfile = () => {
  const [data, setData] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMockProfile = async () => {
      await new Promise((res) => setTimeout(res, 1000));

      const mockData: AdminProfile = {
        name: "Anand Dev",
        email: "anand@example.com",
        phone: "+91 9876543210",
        role: "Founder & CEO",
        image: "https://i.pravatar.cc/150?img=10",
      };

      setData(mockData);
      setLoading(false);
    };

    fetchMockProfile();
  }, []);

  return { data, loading };
};
