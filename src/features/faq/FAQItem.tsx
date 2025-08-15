// src/components/faq/FAQItem.tsx
import React from "react";
import { FiChevronDown } from "react-icons/fi";
import "../../styles/faq.css";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="faq-item">
      <button className={`faq-toggle ${isOpen ? "open" : ""}`} onClick={onToggle}>
        <span className="faq-question">{question}</span>
        <FiChevronDown className={`chevron ${isOpen ? "rotate" : ""}`} size={18} />
      </button>
      {isOpen && <div className="faq-answer">{answer}</div>}
    </div>
  );
};

export default FAQItem;
