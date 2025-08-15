import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { Button } from "../../../../components/ui/button";

import OrderDetails from "./OrderDetails";
import CarouselImages from "./CarouselImages";
import PriceData from "./PriceData";
import type { OrderRequest } from "../../../customize-order/hooks/useOrderRequests";
import toast from "react-hot-toast";

type Props = {
  selectedItem: OrderRequest | undefined;
  onCancel: () => void;
  onStatusUpdate: (
    id: number,
    status: OrderRequest["status"],
    price: string
  ) => void;
};

const DetailedOrderRequest = ({
  selectedItem,
  onCancel,
  onStatusUpdate,
}: Props) => {
  const [status, setStatus] = useState<OrderRequest["status"]>("pending");
  const [price, setPrice] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);

  useEffect(() => {
    if (selectedItem?.status) setStatus(selectedItem.status);
    setPrice(selectedItem?.final_price || "");
    setShowInput(!!!selectedItem?.final_price);
  }, [selectedItem]);

  const onEdit = () => setShowInput(true);

  const handleSave = () => {
    if (!selectedItem) return;
    if (status !== selectedItem?.status) {
      if (status === "Accepted" && !price) {
        toast.error("You must enter a price before accepting the order.");
        return;
      }
      onStatusUpdate(selectedItem.id, status, price);
    }
    onCancel();
  };

  if (!selectedItem) return null;

  return (
    <Dialog
      open={!!selectedItem}
      onOpenChange={(isOpen) => !isOpen && onCancel()}
    >
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto no-scrollbar">
        <DialogHeader>
          <DialogTitle>Customized Order Request</DialogTitle>
          <DialogDescription>View your customer's need.</DialogDescription>
        </DialogHeader>

        <OrderDetails selectedItem={selectedItem} />

        {Array.isArray(selectedItem.color_reference_image) &&
          selectedItem.color_reference_image?.length > 0 && (
            <div className="space-y-2 font-semibold">
              <label>Color Reference Images</label>
              <CarouselImages images={selectedItem.color_reference_image} />
            </div>
          )}

        {/* {selectedItem.style_pattern?.length > 0 && (
          <div className="space-y-2 font-semibold">
            <label>Style/Pattern Sample Images</label>
            <CarouselImages images={selectedItem.style_pattern} />
          </div>
        )} */}

        <div className="space-y-1">
          <label>Status</label>
          <Select
            value={status || ""}
            onValueChange={(value) =>
              setStatus(value as OrderRequest["status"])
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="Accepted">Accepted</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {(status === "Accepted" || price) && (
          <PriceData
            showInput={showInput}
            onEdit={onEdit}
            price={price}
            onSelect={(price) => {
              setPrice(price);
              setShowInput(false);
            }}
          />
        )}

        <div className="flex justify-end gap-2 pt-2 text-black">
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            className="text-white hover:bg-black bg-admin-bg"
            onClick={handleSave}
            disabled={
              (status === selectedItem?.status &&
                selectedItem?.final_price === price) ||
              selectedItem?.isUpdating
            }
          >
            {selectedItem?.isUpdating ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailedOrderRequest;
