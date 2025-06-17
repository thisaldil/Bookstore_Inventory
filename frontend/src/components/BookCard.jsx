import React from "react";

function BookCard({ book, onClick }) {
  return (
    <div
      className="cursor-pointer transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
      onClick={onClick}
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-md h-full flex flex-col relative">
        <div className="relative pb-[150%]">
          <img
            src={book.coverImageUrl}
            alt={`${book.title} cover`}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* ✅ Availability Badge */}
          <span
            className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-md ${
              book.available
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {book.available ? "Available" : "Unavailable"}
          </span>
        </div>

        <div className="p-4 flex-grow flex flex-col">
          <h3 className="font-medium text-gray-900 line-clamp-2 mb-1">
            {book.title}
          </h3>
          <p className="text-sm text-gray-600 mb-2">{book.author}</p>
          <div className="mt-auto">
            <span className="inline-block px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">
              {book.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
