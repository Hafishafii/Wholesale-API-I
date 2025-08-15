import { useCallback, useEffect, useState } from "react";
import type { AdminNotification } from "../types";
import api from "../../../../lib/api";

export const useAdminNotifications = () => {
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [loading, setLoading] = useState(false); // list loading
  const [refreshing, setRefreshing] = useState(false); // manual refresh button
  const [error, setError] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);

  const fetchNotifications = useCallback(
    async (url?: string, append = false, isManual = false) => {
      try {
        if (isManual) {
          setRefreshing(true);
        } else if (!append) {
          setLoading(true);
        }

        const res = await api.get(url || "/notifications/");
        const notificationsArray = Array.isArray(res.data.results)
          ? res.data.results
          : [];

        const validTypes = ["alert", "purchase", "system"] as const;

        const sanitized: AdminNotification[] = notificationsArray.map((n: any) => ({
          id: n.id.toString(),
          message: n.message,
          timestamp: n.created_at || n.timestamp || new Date().toISOString(),
          isRead: n.is_read ?? false,
          type: validTypes.includes(n.type) ? n.type : "system",
          buyer: n.buyer
            ? {
                name: n.buyer.name,
                company: n.buyer.company,
              }
            : undefined,
          items: n.items
            ? n.items.map((item: any) => ({
                name: item.name,
                quantity: item.quantity,
                variant: item.variant,
              }))
            : undefined,
        }));

        setNotifications((prev) =>
          append ? [...prev, ...sanitized] : sanitized
        );
        setUnreadCount(
          (append ? [...notifications, ...sanitized] : sanitized).filter(
            (n) => !n.isRead
          ).length
        );
        setNextPageUrl(res.data.next || null);
        setError(null);
      } catch (err) {
        setError("Failed to load notifications");
        console.error(err);
        if (!append) {
          setNotifications([]);
          setUnreadCount(0);
        }
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [notifications]
  );

  const manualRefresh = useCallback(() => {
    fetchNotifications(undefined, false, true);
  }, [fetchNotifications]);

  const loadMore = useCallback(() => {
    if (nextPageUrl) {
      fetchNotifications(nextPageUrl, true);
    }
  }, [nextPageUrl, fetchNotifications]);

  const markAsRead = useCallback(async (id: string) => {
    try {
      await api.post(`/notifications/${id}/mark-read/`);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error("Failed to mark notification as read", err);
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    try {
      await api.post("/notifications/mark-all-read/");
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error("Failed to mark all notifications as read", err);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(() => {
      fetchNotifications(undefined, false, false); // background refresh
    }, 30000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  return {
    notifications,
    loading,
    refreshing,
    error,
    unreadCount,
    manualRefresh,
    markAsRead,
    markAllAsRead,
    loadMore,
    hasMore: !!nextPageUrl,
  };
};
