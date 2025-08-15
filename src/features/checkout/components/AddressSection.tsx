import { useNavigate } from "react-router-dom";
import type { Address } from "../../../types/shipping";

interface Props {
  address: Address | null;
}

export const AddressSection = ({ address }: Props) => {
  const navigate = useNavigate();

  if (!address) return null;

  const handleChangeClick = () => {
    navigate("/address", {
      state: {
        fromCheckout: true,
      },
    }); // Update this path based on your route setup
  };

  return (
    <section className="mb-6">
      <h2 className="font-medium text-md">Address</h2>
      <p className="text-sm mt-1 whitespace-pre-line leading-relaxed text-gray-700">
        Company Name: {address.company}
        {"\n"}Address: {address.addressLine1}
        {"\n"}
        {address.addressLine2}
        {"\n"}City: {address.city}
        {"\n"}State: {address.state}
        {"\n"}Pincode: {address.pincode}
        {"\n"}Country: {address.country}
        {"\n"}Phone: {address.phone}
        {"\n"}Email: {address.email}
        {"\n"}GSTIN: {address.gstin}
      </p>
      <button
        onClick={handleChangeClick}
        className="mt-2 px-3 py-1 text-sm bg-blue-900 hover:bg-blue-700 text-white rounded"
      >
        Change
      </button>
    </section>
  );
};
