import { Button } from "../../../../components/ui/button";
import { CheckIcon } from "lucide-react";
import type { AdminNotification } from "../types";

const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return `${seconds} seconds ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  return `${Math.floor(seconds / 86400)} days ago`;
};

type Props = {
  notification: AdminNotification;
  onMarkAsRead: (id: string) => void;
  loading?: boolean; // optional if you want to disable button during async mark
};

export const NotificationItem = ({ notification, onMarkAsRead, loading = false }: Props) => {
  const handleMarkAsRead = () => {
    if (!notification.isRead && !loading) {
      onMarkAsRead(notification.id);
    }
  };

  return (
    <div
      onClick={handleMarkAsRead}
      className={`p-4 border rounded-lg cursor-pointer transition ${
        !notification.isRead ? "bg-blue-50 border-blue-200" : "bg-background"
      } hover:shadow-sm`}
    >
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">
              {notification.buyer?.company || notification.buyer?.name}
            </span>
            <span className="text-xs text-muted-foreground">
              {formatTimeAgo(notification.timestamp)}
            </span>
          </div>
          <p className="mt-1 text-sm">{notification.message}</p>
          {notification.items?.map((item, index) => (
            <div className="text-xs text-muted-foreground" key={index}>
              {item.quantity}+ {item.name} {item.variant && `(${item.variant})`}
            </div>
          ))}
        </div>

        {!notification.isRead && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={(e) => {
              e.stopPropagation();
              handleMarkAsRead();
            }}
            disabled={loading}
          >
            <CheckIcon className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
