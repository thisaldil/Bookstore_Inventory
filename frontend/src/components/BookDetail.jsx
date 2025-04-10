import React from "react";
import { ArrowLeftIcon, BookmarkIcon, ShareIcon } from "lucide-react";

function BookDetail({ book, onBack }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-amber-800 text-white flex items-center">
        <button
          onClick={onBack}
          className="flex items-center mr-4 hover:bg-amber-700 p-2 rounded-full"
        >
          <ArrowLeftIcon size={20} />
        </button>
        <h2 className="text-xl font-semibold">Book Details</h2>
      </div>
      <div className="md:flex">
        <div className="md:w-1/3 p-6">
          <div className="rounded-lg overflow-hidden shadow-lg mx-auto max-w-xs">
            <img
              src={book.coverImage}
              alt={`${book.title} cover`}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <button className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors">
              Read Now
            </button>
            <button className="p-3 border border-gray-300 hover:bg-gray-100 rounded-lg transition-colors">
              <BookmarkIcon size={20} className="text-gray-700" />
            </button>
            <button className="p-3 border border-gray-300 hover:bg-gray-100 rounded-lg transition-colors">
              <ShareIcon size={20} className="text-gray-700" />
            </button>
          </div>
        </div>
        <div className="md:w-2/3 p-6">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
            {book.title}
          </h1>
          <p className="text-xl text-gray-700 mb-4">by {book.author}</p>
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
              {book.genre}
            </span>
            <span className="text-gray-500">{book.pages} pages</span>
            <span className="text-gray-500">
              Published: {book.publishedYear}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Synopsis</h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            {book.description}
          </p>
          {book.highlights && (
            <>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Highlights
              </h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                {book.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
