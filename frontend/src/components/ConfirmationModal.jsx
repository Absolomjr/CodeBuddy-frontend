import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const ConfirmationModal = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-sm transform transition-all duration-300 scale-100">
        <div className="flex items-center gap-3 mb-4">
          <FaExclamationTriangle className="text-yellow-500 text-2xl" />
          <h2 className="text-lg font-semibold text-gray-800">Confirm Action</h2>
        </div>
        <p className="text-gray-600 mb-6">{message || "Are you sure you want to delete this user? This action cannot be undone."}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;