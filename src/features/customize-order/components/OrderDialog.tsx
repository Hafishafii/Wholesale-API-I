import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
} from "../../../components/ui/dialog";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";
import type { OrderRequest } from "../hooks/useOrderRequests";
import { generateEmailLink, generateWhatsAppLink } from "../utils/links";
import { Button } from "../../../components/ui/button";
import { formatRupee } from "../../../utils/helpers/formatters";
import { useUser } from "../../../hooks/useUser";

interface ContactDialogProps {
  order: OrderRequest;
  onClose?: () => void;
}

const OrderDialog = ({ order, onClose }: ContactDialogProps) => {
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  
  const handleWhatsApp = () => {
    const waLink = generateWhatsAppLink(order);
    window.open(waLink, "_blank");
    setOpen(false);
    onClose?.();
  };

  const handleEmail = () => {
    const emailLink = generateEmailLink(order);
    window.open(emailLink, "_blank");
    setOpen(false);
    onClose?.();
  };
  if (!order?.user || !user) return;
  if (user?.role === "admin")
    return (
      <p>
        Final Price :{" "}
        <span className="text-green-500 text-xl font-bold">
          {formatRupee(Number(order?.final_price))}
        </span>
      </p>
    );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Order Now ({formatRupee(Number(order?.final_price))})
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md space-y-6">
        <DialogHeader className="text-2xl font-semibold italic text-center">Continue to order </DialogHeader>
        <p>Choose how you want to contact our officials :</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            onClick={handleWhatsApp}
            className="cursor-pointer border rounded-lg p-4 flex flex-col items-center justify-center gap-3 hover:shadow-lg transition-shadow"
          >
            <FaWhatsapp className="text-green-500" size={48} />
            <h3 className="text-lg font-semibold">WhatsApp</h3>
            <p className="text-center text-sm text-gray-600">
              Contact via WhatsApp with all order details.
            </p>
          </div>

          <div
            onClick={handleEmail}
            className="cursor-pointer border rounded-lg p-4 flex flex-col items-center justify-center gap-3 hover:shadow-lg transition-shadow"
          >
            <FaEnvelope className="text-blue-600" size={48} />
            <h3 className="text-lg font-semibold">Email</h3>
            <p className="text-center text-sm text-gray-600">
              Send an email to discuss your order.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDialog;
