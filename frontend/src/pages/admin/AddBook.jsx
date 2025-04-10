import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBook } from "../../services/bookService";

function AddBook() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    coverImage: "",
    description: "",
    pages: "",
    publishedYear: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addBook(form);
    navigate("/admin/books");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Book</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md max-w-2xl space-y-4"
      >
        {[
          "title",
          "author",
          "genre",
          "coverImage",
          "description",
          "pages",
          "publishedYear",
        ].map((field) => (
          <div key={field}>
            <label className="block font-medium mb-1 capitalize">{field}</label>
            <input
              type={
                field === "pages" || field === "publishedYear"
                  ? "number"
                  : "text"
              }
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}

export default AddBook;
