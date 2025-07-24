import React from "react";

const AddMenteeModal = ({ isOpen, onClose, form, onChange, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded-lg shadow-lg z-50 w-[90%] max-w-xl p-6">
      <button
        onClick={onClose}
        className="absolute top-3 right-4 text-gray-400 text-2xl hover:text-gray-600"
      >
        &times;
      </button>
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">Add Mentee</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          className="w-full px-4 py-3 border rounded-lg"
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={onChange}
          required
        />
        <input
          className="w-full px-4 py-3 border rounded-lg"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
          required
        />
        <input
          className="w-full px-4 py-3 border rounded-lg"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={onChange}
          required
        />
        <select
          className="w-full px-4 py-3 border rounded-lg"
          name="degree"
          value={form.degree}
          onChange={onChange}
          required
        >
          <option value="">Select Degree</option>
          <option value="BSCS">BSCS</option>
          <option value="BSIT">BSIT</option>
          <option value="BSDS">BSDS</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddMenteeModal;
