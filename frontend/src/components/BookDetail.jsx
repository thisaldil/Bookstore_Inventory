import React, { useState } from "react";
import {
  ArrowLeft,
  Bookmark,
  Share,
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

function BookReader({ book, isOpen, onClose }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setCurrentPage(1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-full max-h-[90vh] flex flex-col">
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
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 overflow-y-auto bg-gradient-to-br from-amber-50 to-orange-50 flex justify-center">
          <Document
            file={book.pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<p className="text-gray-700">Loading PDF...</p>}
            error={<p className="text-red-500">Failed to load PDF.</p>}
          >
            <Page
              pageNumber={currentPage}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              width={600}
            />
          </Document>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between p-6 border-t bg-white">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage <= 1}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
          >
            <ChevronLeft size={20} />
            Previous
          </button>

          <span className="text-gray-600">
            Page {currentPage} of {numPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(numPages, p + 1))}
            disabled={currentPage >= numPages}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
          >
            Next
            <ChevronRight size={20} />
          </button>
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
