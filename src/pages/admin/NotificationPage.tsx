import { Button } from "../../components/ui/button";
import { BellIcon, CheckIcon, RefreshCwIcon } from "lucide-react";
import {
  useAdminNotifications,
  NotificationItem,
  NotificationListSkeleton,
} from "../../features/admin/notification";

export const NotificationPage = () => {
  const {
    notifications,
    loading,
    refreshing,
    error,
    unreadCount,
    manualRefresh,
    markAsRead,
    markAllAsRead,
    loadMore,
    hasMore,
  } = useAdminNotifications();

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
          <BellIcon className="h-5 w-5" />
          <span>Notifications</span>
          {unreadCount > 0 && (
            <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
              {unreadCount}
            </span>
          )}
        </h1>

        <div className="flex flex-wrap gap-2">
          <Button
            onClick={manualRefresh}
            variant="outline"
            disabled={refreshing}
          >
            <RefreshCwIcon
              className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button
            onClick={markAllAsRead}
            disabled={loading || notifications.length === 0}
          >
            <CheckIcon className="h-4 w-4 mr-1" />
            Mark all as read
          </Button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {error && <div className="p-4 text-sm text-destructive">{error}</div>}

        {loading && notifications.length === 0 ? (
          <NotificationListSkeleton />
        ) : notifications.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No notifications
          </div>
        ) : (
          <>
            {notifications.map((n) => (
              <NotificationItem
                key={n.id}
                notification={n}
                onMarkAsRead={markAsRead}
              />
            ))}

            {/* Load More Button */}
            {!loading && hasMore && (
              <div className="flex justify-center mt-4">
                <Button variant="outline" onClick={loadMore}>
                  Load more
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
