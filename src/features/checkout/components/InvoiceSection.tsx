import type { Invoice } from "../../../types/invoice";

interface Props {
  invoice: Invoice | null;
}

export const InvoiceSection = ({ invoice }: Props) => {
  if (!invoice) return null;

  return (
    <section>
      <h2 className="font-medium text-md">Invoice</h2>
      <p className="text-sm text-gray-700 mt-1">
        Invoice No: {invoice.number}
        <br />
        Date: {invoice.date}
        <br />
        Due Date: {invoice.dueDate}
      </p>
      <p className="mt-2 text-sm text-gray-800 font-semibold">Billed To:</p>
    </section>
  );
};
