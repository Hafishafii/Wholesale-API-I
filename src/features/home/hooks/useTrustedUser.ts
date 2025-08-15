import { useEffect, useState } from "react";
import api from "../../../lib/api"; 

export const useTrustedUser = () => {
  const [isTrusted, setIsTrusted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkTrustedStatus = async () => {
      try {
        const response = await api.get("review/is-trusted/");
        setIsTrusted(response.data.is_trusted);
      } catch (error) {
        console.error("Error fetching trusted status:", error);
        setIsTrusted(false);
      } finally {
        setLoading(false);
      }
    };

    checkTrustedStatus();
  }, []);

  return { isTrusted, loading };
};
