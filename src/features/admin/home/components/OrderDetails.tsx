import type { OrderRequest } from "../../../customize-order/hooks/useOrderRequests";

type OrderDetailsProps = {
  selectedItem: OrderRequest;
};

const OrderDetails = ({ selectedItem }: OrderDetailsProps) => {
  const commonClass = "flex flex-col font-semibold gap-2";
  const pClass = "font-normal px-3 py-2 bg-gray-100 rounded";
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm py-4">
      <div className={commonClass}>
        <label>Name</label>
        <p className={pClass}>{selectedItem.name}</p>
      </div>
      <div className={commonClass}>
        <label>Email</label>
        <p className={pClass}>{selectedItem.email}</p>
      </div>
      <div className={commonClass}>
        <label>Phone</label>
        <p className={pClass}>{selectedItem.phone}</p>
      </div>
      <div className={commonClass}>
        <label>Product Type</label>
        <p className={pClass}>{selectedItem.product_type}</p>
      </div>
      <div className={commonClass}>
        <label>Color Preferences</label>
        <p className={pClass}>
          {selectedItem?.color_preferences?.primary +
            "," +
            selectedItem?.color_preferences?.primary}
        </p>
      </div>
      <div className={commonClass}>
        <label>Style / Pattern</label>
        <p className={pClass}>{selectedItem.style_pattern}</p>
      </div>
      <div className={commonClass}>
        <label>Sizes</label>
        <p className={pClass}>{selectedItem?.size}</p>
      </div>
      <div className={commonClass}>
        <label>Branding</label>
        <p className={pClass}>{selectedItem.brand_label ? "Yes" : "No"}</p>
      </div>
      <div className={commonClass}>
        <label>Quantity</label>
        <p className={pClass}>{selectedItem.quantity}</p>
      </div>
      <div className={commonClass}>
        <label>Expected Date</label>
        <p className={pClass}>
          {new Date(selectedItem?.preferred_delivery_date).toLocaleDateString()}
        </p>
      </div>
      <div className={commonClass}>
        <label>Instructions</label>
        <p className={pClass}>{selectedItem.additional_instructions}</p>
      </div>
    </div>
  );
};

export default OrderDetails;
