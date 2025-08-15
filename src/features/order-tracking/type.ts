type OrderStatusStep = {
  status: string;
  date?: Date;
};

export type OrderData = {
  orderNumber: string;
  statusTimeline: OrderStatusStep[];
  orderPlacedDate: Date;
  orderReceivedDate?: Date;
  currentStatus: string;
};
