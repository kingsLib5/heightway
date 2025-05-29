import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
      <div className="bg-white rounded-lg p-5 w-[90%] max-w-[500px] shadow-xl">
        <div className="flex justify-between items-center">
          <h5 className="text-lg font-semibold text-gray-900">{title}</h5>
          <button
            className="text-2xl bg-transparent border-none cursor-pointer hover:text-gray-700"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
