import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import BookList from "./components/BookList";
import BookDetail from "./components/BookDetail";
import { books } from "./data/books";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBookList from "./pages/admin/AdminBookList";
import AddBook from "./pages/admin/AddBook";
import EditBook from "./pages/admin/EditBook";
import AdminLogin from "./pages/admin/AdminLogin";

function HomePage() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  const genres = ["All", ...new Set(books.map((book) => book.genre))];

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre =
      selectedGenre === "All" || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        genres={genres}
      />
      <main className="container mx-auto px-4 py-8">
        {selectedBook ? (
          <BookDetail
            book={selectedBook}
            onBack={() => setSelectedBook(null)}
          />
        ) : (
          <BookList books={filteredBooks} onSelectBook={setSelectedBook} />
        )}
      </main>
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-amber-50">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/books" element={<AdminBookList />} />
        <Route path="/admin/books/add" element={<AddBook />} />
        <Route path="/admin/books/edit/:id" element={<EditBook />} />
      </Routes>
    </div>
  );
}

export default App;
