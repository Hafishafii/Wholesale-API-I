import React from "react";

interface SuccessModalProps {
  message: string;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl px-6 py-8 shadow-xl max-w-md w-full text-center">
        <h2 className="text-xl font-semibold text-green-600 mb-4">Success</h2>
        <p className="text-base text-gray-700 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded-lg w-full"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
