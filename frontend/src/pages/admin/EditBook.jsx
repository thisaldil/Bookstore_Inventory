import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBooks, updateBook } from "../../services/bookService";

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    getBooks().then((res) => {
      const book = res.data.find((b) => b.id === parseInt(id));
      if (book) setForm(book);
    });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateBook(id, form);
    navigate("/admin/books");
  };

  if (!form) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Book</h1>
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
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditBook;
