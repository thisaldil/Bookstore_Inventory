import React from "react";
import BookCard from "./BookCard";

function BookList({ books, onSelectBook }) {
  if (books.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-medium text-gray-700">No books found</h2>
        <p className="text-gray-500 mt-2">
          Try adjusting your search or filter
        </p>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-3xl font-serif font-semibold text-amber-900 mb-6">
        Browse Our Collection
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onClick={() => onSelectBook(book)}
          />
        ))}
      </div>
    </div>
  );
}

export default BookList;
