import React from "react";

const AddMenteeModal = ({ isOpen, onClose, form, onChange, onSubmit, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded-lg shadow-lg z-50 w-[90%] max-w-md p-6">
      <h3 className="text-lg font-bold mb-4">Add Mentee</h3>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={onChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={onChange}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <select
          name="degree"
          value={form.degree}
          onChange={onChange}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Select Degree Program</option>
          <option value="BSCS">BSCS</option>
          <option value="BSIT">BSIT</option>
          <option value="BSDS">BSDS</option>
        </select>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Adding..." : "Add Mentee"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMenteeModal;
