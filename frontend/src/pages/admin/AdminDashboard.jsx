import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Plus,
  Search,
  Edit3,
  Trash2,
  Upload,
  Filter,
  Eye,
  Users,
  TrendingUp,
  ShoppingBag,
  Loader2,
  X,
  Save,
} from "lucide-react";

// API functions (replace with your actual API file import)
const API_URL = "https://bookstore-inventory-nk4s.onrender.com/api/books";

const api = {
  getBooks: () => fetch(API_URL).then((res) => res.json()),
  deleteBook: (id) => fetch(`${API_URL}/${id}`, { method: "DELETE" }),
  getBookById: (id) => fetch(`${API_URL}/${id}`).then((res) => res.json()),
  updateBook: (id, book) =>
    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    }),
};

const BookstoreAdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [updating, setUpdating] = useState(false);

  // Form states
  const [uploadForm, setUploadForm] = useState({
    title: "",
    author: "",
    description: "",
    category: "",
    available: true,
    coverImageUrl: "", // ✅ URL
    pdfFile: null, // ✅ File
    pages: "",
    Published: "",
  });

  const [editForm, setEditForm] = useState({
    title: "",
    author: "",
    description: "",
    category: "",
    available: true,
    coverImageUrl: "",
    pdfUrl: "",
    newPdfFile: null, // ✅ add this
    pages: "",
    Published: "",
  });

  const categories = [
    "All",
    "Fiction",
    "Science Fiction",
    "Non-Fiction",
    "Biography",
    "History",
    "Romance",
    "Mystery",
    "Fantasy",
    "Novel",
  ];

  // Load books on component mount
  useEffect(() => {
    loadBooks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // or any session key you're using
    window.location.href = "/"; // or redirect to login page
  };

  const loadBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getBooks();
      setBooks(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(
        "Failed to load books. Please check if your server is running on http://localhost:8080"
      );
      console.error("Error loading books:", err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    totalBooks: books.length,
    availableBooks: books.filter((b) => b.available).length,
    categories: [...new Set(books.map((b) => b.category).filter(Boolean))]
      .length,
    recentUploads: books.length, // You can modify this based on your needs
  };

  const handleDeleteBook = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await api.deleteBook(id);
        setBooks(books.filter((book) => book.id !== id));
      } catch (err) {
        alert("Failed to delete book. Please try again.");
        console.error("Error deleting book:", err);
      }
    }
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setEditForm({
      title: book.title || "",
      author: book.author || "",
      description: book.description || "",
      category: book.category || "",
      available: book.available ?? true,
      coverImageUrl: book.coverImageUrl || "",
      pdfUrl: book.pdfUrl || "",
      pages: book.pages || "",
      Published: book.published || "",
    });
    setShowEditModal(true);
  };

  const uploadPdfToCloudinary = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "pdf_upload"); // your unsigned preset
      // Do NOT include resource_type in FormData — it's part of the URL
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/df7l4fer1/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Upload failed");
      }

      return data.secure_url; // Final public URL of the uploaded PDF
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw error;
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();

    if (
      !uploadForm.title ||
      !uploadForm.author ||
      !uploadForm.pages ||
      !uploadForm.Published ||
      !uploadForm.pdfFile ||
      !uploadForm.coverImageUrl
    ) {
      alert(
        "Please fill all required fields including Cover Image URL and PDF"
      );
      return;
    }

    setUploading(true);
    try {
      // 1. Upload PDF to Cloudinary
      const pdfUrl = await uploadPdfToCloudinary(uploadForm.pdfFile);

      // 2. Save the book to your backend (MongoDB)
      const bookData = {
        title: uploadForm.title,
        author: uploadForm.author,
        description: uploadForm.description,
        category: uploadForm.category,
        available: uploadForm.available,
        coverImageUrl: uploadForm.coverImageUrl,
        pdfUrl: pdfUrl,
        pages: uploadForm.pages,
        published: uploadForm.Published,
      };

      await fetch("http://localhost:8080/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      });

      // Reset form
      setUploadForm({
        title: "",
        author: "",
        description: "",
        category: "",
        available: true,
        coverImageUrl: "",
        pdfFile: null,
        pages: "",
        Published: "",
      });
      setShowUploadModal(false);
      await loadBooks();
    } catch (err) {
      console.error("Error uploading book:", err);
      alert("Upload failed. Check console.");
    } finally {
      setUploading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const updatedBook = {
        title: editForm.title,
        author: editForm.author,
        description: editForm.description,
        category: editForm.category,
        available: editForm.available,
        coverImageUrl: editForm.coverImageUrl,
        pdfUrl: editForm.pdfUrl,
        pages: editForm.pages,
        published: editForm.Published,
      };

      await fetch(`${API_URL}/${editingBook.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBook),
      });

      await loadBooks();
      setShowEditModal(false);
      setEditingBook(null);
    } catch (err) {
      alert("Failed to update book");
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-amber-600 animate-spin mx-auto mb-4" />
          <p className="text-amber-800 text-lg">Loading your bookstore...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-800 to-orange-900 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-amber-100" />
              <h1 className="text-2xl font-bold text-amber-50">
                ReadWell Books Admin
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={loadBooks}
                className="bg-amber-700 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-all duration-200"
              >
                Refresh
              </button>
              <button
                onClick={() => setShowUploadModal(true)}
                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Plus className="h-5 w-5" />
                <span>Add Book</span>
              </button>
              <button
                onClick={handleLogout}
                className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-all duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            <p>{error}</p>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-amber-700 to-orange-800 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-100 text-sm">Total Books</p>
                <p className="text-3xl font-bold">{stats.totalBooks}</p>
              </div>
              <BookOpen className="h-8 w-8 text-amber-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Available</p>
                <p className="text-3xl font-bold">{stats.availableBooks}</p>
              </div>
              <ShoppingBag className="h-8 w-8 text-green-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Categories</p>
                <p className="text-3xl font-bold">{stats.categories}</p>
              </div>
              <Filter className="h-8 w-8 text-blue-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">In Database</p>
                <p className="text-3xl font-bold">{stats.recentUploads}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-200" />
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-amber-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 h-5 w-5" />
              <input
                type="text"
                placeholder="Search books by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 h-5 w-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-amber-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative">
                <img
                  src={
                    book.coverImageUrl ||
                    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop"
                  }
                  alt={book.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop";
                  }}
                />
                <div
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
                    book.available
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {book.available ? "Available" : "Out of Stock"}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {book.title}
                </h3>
                <p className="text-amber-700 font-medium mb-2">
                  by {book.author}
                </p>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {book.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                    {book.category || "Uncategorized"}
                  </span>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditBook(book)}
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 px-3 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200"
                  >
                    <Edit3 className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                  {book.pdfUrl && (
                    <button
                      onClick={() => window.open(book.pdfUrl, "_blank")}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg transition-colors duration-200"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteBook(book.id)}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg transition-colors duration-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBooks.length === 0 && !loading && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-amber-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No books found
            </h3>
            <p className="text-gray-600">
              {books.length === 0
                ? "Start by adding your first book!"
                : "Try adjusting your search or filter criteria"}
            </p>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                Upload New Book
              </h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Book Title *"
                value={uploadForm.title}
                onChange={(e) =>
                  setUploadForm({ ...uploadForm, title: e.target.value })
                }
                className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="text"
                placeholder="Author *"
                value={uploadForm.author}
                onChange={(e) =>
                  setUploadForm({ ...uploadForm, author: e.target.value })
                }
                className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500"
              />
              <select
                value={uploadForm.category}
                onChange={(e) =>
                  setUploadForm({ ...uploadForm, category: e.target.value })
                }
                className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500"
              >
                <option value="">Select Category</option>
                {categories.slice(1).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <textarea
                placeholder="Description"
                rows="3"
                value={uploadForm.description}
                onChange={(e) =>
                  setUploadForm({ ...uploadForm, description: e.target.value })
                }
                className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="number"
                placeholder="pages *"
                value={uploadForm.pages}
                onChange={(e) =>
                  setUploadForm({ ...uploadForm, pages: e.target.value })
                }
                className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="date"
                placeholder="Published *"
                value={uploadForm.Published}
                onChange={(e) =>
                  setUploadForm({ ...uploadForm, Published: e.target.value })
                }
                className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/cover.jpg"
                  value={uploadForm.coverImageUrl}
                  onChange={(e) =>
                    setUploadForm({
                      ...uploadForm,
                      coverImageUrl: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PDF File
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) =>
                    setUploadForm({ ...uploadForm, pdfFile: e.target.files[0] })
                  }
                  className="w-full p-3 border border-amber-200 rounded-lg"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="available"
                  checked={uploadForm.available}
                  onChange={(e) =>
                    setUploadForm({
                      ...uploadForm,
                      available: e.target.checked,
                    })
                  }
                  className="rounded border-amber-300 text-amber-600 focus:ring-amber-500"
                />
                <label
                  htmlFor="available"
                  className="text-sm font-medium text-gray-700"
                >
                  Available for checkout
                </label>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleUploadSubmit}
                  disabled={uploading}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4" />
                      <span>Upload Book</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Edit Modal */}
      {showEditModal && editingBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Edit Book</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Book Title *"
                value={editForm.title}
                onChange={(e) =>
                  setEditForm({ ...editForm, title: e.target.value })
                }
                className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="text"
                placeholder="Author *"
                value={editForm.author}
                onChange={(e) =>
                  setEditForm({ ...editForm, author: e.target.value })
                }
                className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500"
              />
              <select
                value={editForm.category}
                onChange={(e) =>
                  setEditForm({ ...editForm, category: e.target.value })
                }
                className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500"
              >
                <option value="">Select Category</option>
                {categories.slice(1).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <textarea
                placeholder="Description"
                rows="3"
                value={editForm.description}
                onChange={(e) =>
                  setEditForm({ ...editForm, description: e.target.value })
                }
                className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="number"
                placeholder="pages *"
                value={editForm.pages}
                onChange={(e) =>
                  setEditForm({ ...editForm, pages: e.target.value })
                }
                className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500"
              />

              <input
                type="date"
                placeholder="Published *"
                value={editForm.Published}
                onChange={(e) =>
                  setEditForm({ ...editForm, Published: e.target.value })
                }
                className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500"
              />

              <input
                type="url"
                placeholder="Cover Image URL"
                value={editForm.coverImageUrl}
                onChange={(e) =>
                  setEditForm({ ...editForm, coverImageUrl: e.target.value })
                }
                className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Replace PDF File (optional)
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) =>
                    setEditForm({ ...editForm, newPdfFile: e.target.files[0] })
                  }
                  className="w-full p-3 border border-amber-200 rounded-lg"
                />
              </div>
              {editForm.pdfUrl && (
                <a
                  href={editForm.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm mt-2 inline-block"
                >
                  View current PDF
                </a>
              )}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="editAvailable"
                  checked={editForm.available}
                  onChange={(e) =>
                    setEditForm({ ...editForm, available: e.target.checked })
                  }
                  className="rounded border-amber-300 text-amber-600 focus:ring-amber-500"
                />
                <label
                  htmlFor="editAvailable"
                  className="text-sm font-medium text-gray-700"
                >
                  Available for checkout
                </label>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleEditSubmit}
                  disabled={updating}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  {updating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Update Book</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookstoreAdminDashboard;
