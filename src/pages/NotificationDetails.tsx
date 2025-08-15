import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import HeaderLayout from "../components/layouts/HeaderLayout";
import api from "../lib/api";

const NotificationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [notification, setNotification] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        // 1️⃣ Get notification details
        const res = await api.get(`/notifications/${id}/`);
        setNotification(res.data);

        // 2️⃣ Mark as read
        await api.post(`/notifications/${id}/mark-read/`);
      } catch (error) {
        console.error("Error fetching notification", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchNotification();
  }, [id]);

  if (loading) {
    return (
      <HeaderLayout>
        <div className="p-4">Loading...</div>
      </HeaderLayout>
    );
  }

  if (!notification) {
    return (
      <HeaderLayout>
        <div className="p-4">Notification not found</div>
      </HeaderLayout>
    );
  }

  return (
    <HeaderLayout>
      <div className="min-h-screen bg-gray-200">
        <div className="flex items-center gap-3 p-4">
          <FaArrowLeft
            className="text-gray-700 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-lg font-semibold">Notification Details</h1>
        </div>
        <div className="p-4 bg-white rounded-md shadow">
          <p className="text-gray-800 font-medium">{notification.message}</p>
          <p className="text-gray-500 text-sm mt-2">{notification.time}</p>
        </div>
      </div>
    </HeaderLayout>
  );
};

export default NotificationDetails;
