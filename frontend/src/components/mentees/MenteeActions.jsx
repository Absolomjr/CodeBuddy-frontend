import React, { useState } from "react";

const MenteeActions = ({ mentee, onEdit, onDelete }) => {
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // new state
  const [editForm, setEditForm] = useState({ ...mentee });

  const handleView = () => setShowViewModal(true);

  const handleEdit = () => {
    setEditForm({ ...mentee });
    setShowEditModal(true);
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    onDelete(mentee.id);
    setShowDeleteConfirm(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEdit(mentee.id, editForm);
    setShowEditModal(false);
  };

  return (
    <>
      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleView}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
        >
          View
        </button>
        <button
          onClick={handleEdit}
          className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
        >
          Delete
        </button>
      </div>

      {/* View Popup (centered, no overlay) */}
      {showViewModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white shadow-xl border rounded-lg p-6 w-[90%] max-w-md">
            <h3 className="text-lg font-bold mb-4">Mentee Details</h3>

            <p className="mb-1"><strong>Name:</strong> {mentee.name}</p>
            <p className="mb-1"><strong>Email:</strong> {mentee.email}</p>
            <p className="mb-1"><strong>Degree:</strong> {mentee.degree}</p>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowViewModal(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal (centered, no overlay) */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
            <h3 className="text-lg font-bold mb-4">Edit Mentee</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="email"
                name="email"
                value={editForm.email}
                onChange={handleEditChange}
                className="w-full border px-3 py-2 rounded"
              />
              <select
                name="degree"
                value={editForm.degree}
                onChange={handleEditChange}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Select Degree</option>
                <option value="BSCS">BSCS</option>
                <option value="BSIT">BSIT</option>
                <option value="BSDS">BSDS</option>
              </select>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal (centered, no overlay) */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white shadow-lg border rounded-lg p-6 w-[90%] max-w-xs text-center">
            <p className="mb-4 text-lg font-semibold">
              Are you sure you want to delete <br /> <span className="text-red-600">{mentee.name}</span>?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={cancelDelete}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default MenteeActions;
