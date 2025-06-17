// ✅ Updated BookDetail.jsx using @react-pdf-viewer for Cloudinary
import React, { useState } from "react";
import { ArrowLeft, Bookmark, Share, BookOpen } from "lucide-react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

function BookReader({ book, isOpen, onClose }) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-amber-50 to-orange-50">
          <div className="flex items-center gap-3">
            <BookOpen className="text-amber-700" size={24} />
            <h2 className="text-2xl font-serif font-bold text-gray-800">
              {book.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            ✕
          </button>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 bg-gradient-to-br from-amber-50 to-orange-50 overflow-hidden">
          <Worker
            workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
          >
            <Viewer
              fileUrl={book.pdfUrl}
              plugins={[defaultLayoutPluginInstance]}
            />
          </Worker>
        </div>
      </div>
    </div>
  );
}

function BookDetail({ book, onBack }) {
  const [isReaderOpen, setIsReaderOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 bg-amber-800 text-white flex items-center">
          <button
            onClick={onBack}
            className="flex items-center mr-4 hover:bg-amber-700 p-2 rounded-full"
          >
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-xl font-semibold">Book Details</h2>
        </div>
        <div className="md:flex">
          <div className="md:w-1/3 p-6">
            <div className="rounded-lg overflow-hidden shadow-lg mx-auto max-w-xs">
              <img
                src={book.coverImageUrl}
                alt={`${book.title} cover`}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setIsReaderOpen(true)}
                className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <BookOpen size={20} />
                Read Now
              </button>
              <button className="p-3 border border-gray-300 hover:bg-gray-100 rounded-lg transition-colors">
                <Bookmark size={20} className="text-gray-700" />
              </button>
              <button className="p-3 border border-gray-300 hover:bg-gray-100 rounded-lg transition-colors">
                <Share size={20} className="text-gray-700" />
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
                {book.category}
              </span>
              <span className="text-gray-500">{book.pages} pages</span>
              <span className="text-gray-500">Published: {book.published}</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Synopsis
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              {book.description}
            </p>
            {book.highlights && book.highlights.length > 0 && (
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

      <BookReader
        book={book}
        isOpen={isReaderOpen}
        onClose={() => setIsReaderOpen(false)}
      />
    </>
  );
}

export default BookDetail;
