import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const ConfirmationModal = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Are you sure?</h2>
        <p className="text-gray-600 mb-6"> Are you sure you want to delete this user? This action cannot be undone.</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm} // ✅ This must exist and fire handleDeleteConfirmed()
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};


export default ConfirmationModal;