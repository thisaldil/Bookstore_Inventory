import React from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Link
          to="/admin/books"
          className="bg-white shadow hover:shadow-md p-6 rounded-xl border border-gray-200 transition"
        >
          <h2 className="text-xl font-semibold text-amber-700 mb-2">
            Manage Books
          </h2>
          <p className="text-gray-600">
            View, add, edit or delete books in your inventory.
          </p>
        </Link>
        <Link
          to="/admin/books/add"
          className="bg-white shadow hover:shadow-md p-6 rounded-xl border border-gray-200 transition"
        >
          <h2 className="text-xl font-semibold text-amber-700 mb-2">
            Add New Book
          </h2>
          <p className="text-gray-600">
            Quickly add a new book to the catalog.
          </p>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
