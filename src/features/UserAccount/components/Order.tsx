import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Order = () => {

  const navigate = useNavigate()
  return (
    <div className="my-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Orders</h2>

      <div className="border rounded-lg shadow-lg bg-white">
        {/* Item 1 */}
        <button onClick={() =>navigate('/purchase')} className="p-4 flex w-full justify-between items-center border-b hover:bg-gray-50 cursor-pointer transition">
          <p className="font-medium text-gray-700">Add Review</p>
          <ChevronRight className="text-gray-400" />
        </button>

        {/* Item 2 */}
        <button onClick={() =>navigate('/orders')} className="p-4 w-full flex justify-between items-center hover:bg-gray-50 cursor-pointer transition">
          <p className="font-medium text-gray-700">Orders</p>
          <ChevronRight className="text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default Order;
