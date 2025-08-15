import React from "react";
import { FiX } from "react-icons/fi";
import FAQList from "../features/faq/FAQList";
import "../styles/faq.css";
import StackHeaderLayout from "../components/layouts/StackHeaderLayout";

const FAQPage: React.FC = () => {
  return (
    <StackHeaderLayout title="FAQs">
      <div className="faq-container">
        <p className="faq-breadcrumb">
          Help&nbsp;And&nbsp;Support&nbsp;&gt;&nbsp;
          <span className="font-medium text-gray-800">FAQs</span>
        </p>

        <div className="faq-card">
          <button
            aria-label="close"
            className="faq-close"
            onClick={() => window.history.back()}
          >
            <FiX size={18} />
          </button>

          <h2 className="faq-title">Frequently Asked Questions</h2>
          <p className="faq-subtitle">
            Welcome to the Seller Help Center. If you still need help, please
            contact our support team.
          </p>

          <FAQList />
        </div>
      </div>
    </StackHeaderLayout>
  );
};

export default FAQPage;
