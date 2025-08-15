// components/NotificationCard.tsx
import React from "react";
import { FaBell } from "react-icons/fa";

interface NotificationCardProps {
  message: string;
  time: string;
  read: boolean;
  onRead: () => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ message, time, read, onRead }) => {
  return (
    <div
      className={`flex items-start rounded-lg p-6 shadow-sm mb-4 w-full cursor-pointer transition-colors ${read ? 'bg-gray-200' : 'bg-white'}`}
      onClick={onRead}
    >
      <div className="w-12 h-12 bg-blue-900 rounded-lg flex justify-center items-center mr-4 min-w-[48px]">
        <FaBell color="white" size={20} />
      </div>
      <div className="flex-grow">
        <div className="text-base font-medium text-gray-900 mb-1">{message}</div>
        <div className="text-sm text-gray-500">{time}</div>
      </div>
    </div>
  );
};

export default NotificationCard;
