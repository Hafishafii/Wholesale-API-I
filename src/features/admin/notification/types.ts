// src/features/admin/notification/types.ts

export type AdminNotification = {
  id: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'purchase' | 'system' | 'alert';
  buyer?: {
    name: string;
    company?: string;
  };
  items?: {
    name: string;
    quantity: number;
    variant?: string;
  }[];
};
