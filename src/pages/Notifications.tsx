import React, { useState, useEffect } from "react";
import NotificationCard from "../features/auth/components/NotificationCard";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import HeaderLayout from "../components/layouts/HeaderLayout";
import api from "../lib/api";

const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [readStatus, setReadStatus] = useState<boolean[]>([]);
  const [loading, setLoading] = useState(true);
  const [markAllLoading, setMarkAllLoading] = useState(false);

  useEffect(() => {
  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications/");
      console.log("API Response:", res.data);

      // Try to extract array
      const dataArray =
        Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.results)
          ? res.data.results
          : Array.isArray(res.data.notifications)
          ? res.data.notifications
          : [];

      setNotifications(dataArray);
      setReadStatus(dataArray.map((n: any) => n.read || false));
    } catch (error) {
      console.error("Error fetching notifications", error);
    } finally {
      setLoading(false);
    }
  };
  fetchNotifications();
}, []);


  const handleRead = (index: number) => {
    setReadStatus((prev) => prev.map((r, i) => (i === index ? true : r)));
  };

  const handleMarkAllRead = async () => {
    try {
      setMarkAllLoading(true);
      await api.post("/notifications/mark-all-read/");
      setReadStatus(Array(notifications.length).fill(true));
    } catch (error) {
      console.error("Failed to mark all notifications as read", error);
    } finally {
      setMarkAllLoading(false);
    }
  };

  return (
    <HeaderLayout>
      <div className="min-h-screen bg-gray-200">
        {/* Header */}
        <div className="px-4 py-4 flex items-center justify-between">
          <button className="p-2" onClick={() => navigate("/home")}>
            <FaArrowLeft className="text-gray-700" size={18} />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Notification</h1>
          <button
            className="text-blue-900 font-medium text-sm disabled:opacity-60"
            style={{ cursor: markAllLoading ? "not-allowed" : "pointer" }}
            onClick={handleMarkAllRead}
            disabled={markAllLoading}
          >
            {markAllLoading ? "Reading..." : "Read All"}
          </button>
        </div>

        {/* Notifications List */}
        <div className="p-4 space-y-3">
          {loading ? (
            <p>Loading notifications...</p>
          ) : notifications.length === 0 ? (
            <p>No notifications found</p>
          ) : (
            notifications.map((note, index) => (
              <Link key={note.id} to={`/notifications/${note.id}`}>
                <NotificationCard
                  message={note.message}
                  time={note.time}
                  read={readStatus[index]}
                  onRead={() => handleRead(index)}
                />
              </Link>
            ))
          )}
        </div>
      </div>
    </HeaderLayout>
  );
};

export default Notifications;
