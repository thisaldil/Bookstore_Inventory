import React from "react";
import { SearchIcon, BookOpenIcon, ShieldCheckIcon } from "lucide-react";
import { Link } from "react-router-dom";

function Header({
  searchQuery,
  setSearchQuery,
  selectedGenre,
  setSelectedGenre,
  genres,
}) {
  return (
    <header className="bg-amber-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center">
            <BookOpenIcon size={28} className="mr-2" />
            <h1 className="text-2xl font-serif font-bold">Readwell Books</h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:items-center w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <SearchIcon
                size={18}
                className="absolute left-3 top-2.5 text-gray-500"
              />
            </div>

            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="px-4 py-2 rounded-lg bg-amber-700 text-white border border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>

            {/* Admin Login button */}
            <Link
              to="/adminlogin"
              className="flex items-center gap-2 bg-white text-amber-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
            >
              <ShieldCheckIcon size={18} />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
