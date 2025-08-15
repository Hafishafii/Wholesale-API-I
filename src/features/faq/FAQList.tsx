// src/components/faq/FAQList.tsx
import React, { useState } from "react";
import FAQItem from "./FAQItem";

const faqs = [
  {
    q: "How do I update my store profile or contact information?",
    a: "Head to Profile Information → Edit Profile, update the fields you need and press Save.",
  },
  {
    q: "How do I manage and track orders?",
    a: "Open the Orders tab in the top‑bar. Every order shows its current status and a tracking link.",
  },
  {
    q: "How do I update my bank details?",
    a: "Go to Bank & Payment Info in the sidebar. Add your new account and click Verify.",
  },
  {
    q: "How do I add a new product?",
    a: "Navigate to Product → Add New. Fill in the product form and submit for review.",
  },
  {
    q: "Is it mandatory to provide a GST number?",
    a: "For sellers in India, a valid GSTIN is required to list taxable products on the platform.",
  },
];

const FAQList: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIdx((prev) => (prev === index ? null : index));
  };

  return (
    <div className="faq-list">
      {faqs.map((item, idx) => (
        <FAQItem
          key={idx}
          question={item.q}
          answer={item.a}
          isOpen={openIdx === idx}
          onToggle={() => toggle(idx)}
        />
      ))}
    </div>
  );
};

export default FAQList;
