// ✅ Enhanced BookDetail.jsx with Share Functionality and Antique Styling
import React, { useState } from "react";
import {
  ArrowLeft,
  Bookmark,
  Share,
  BookOpen,
  X,
  Facebook,
  Twitter,
  MessageCircle,
  Link,
  Mail,
} from "lucide-react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

// Social Share Modal Component
function ShareModal({ book, isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareUrl = window.location.href;
  const shareText = `Check out "${book.title}" by ${
    book.author
  } - ${book.description?.substring(0, 100)}...`;

  const socialPlatforms = [
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}&quote=${encodeURIComponent(shareText)}`,
      color: "bg-blue-600 hover:bg-blue-700",
      textColor: "text-blue-600",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText
      )}&url=${encodeURIComponent(shareUrl)}`,
      color: "bg-sky-500 hover:bg-sky-600",
      textColor: "text-sky-500",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      url: `https://wa.me/?text=${encodeURIComponent(
        shareText + " " + shareUrl
      )}`,
      color: "bg-green-600 hover:bg-green-700",
      textColor: "text-green-600",
    },
    {
      name: "Email",
      icon: Mail,
      url: `mailto:?subject=${encodeURIComponent(
        `Recommended Book: ${book.title}`
      )}&body=${encodeURIComponent(shareText + "\n\n" + shareUrl)}`,
      color: "bg-gray-600 hover:bg-gray-700",
      textColor: "text-gray-600",
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleShare = (url) => {
    window.open(
      url,
      "_blank",
      "width=600,height=400,scrollbars=yes,resizable=yes"
    );
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-2xl shadow-2xl border-2 border-amber-200/50 max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-700 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Share className="text-white" size={20} />
            <h3 className="text-lg font-serif font-semibold text-white">
              Share This Book
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="text-white" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Book Info */}
          <div className="flex items-center gap-4 mb-6 p-4 bg-white/60 rounded-lg border border-amber-200/30">
            <img
              src={book.coverImageUrl}
              alt={book.title}
              className="w-12 h-16 object-cover rounded shadow-md"
            />
            <div className="flex-1">
              <h4 className="font-serif font-semibold text-amber-900 text-sm">
                {book.title}
              </h4>
              <p className="text-amber-700 text-xs">by {book.author}</p>
            </div>
          </div>

          {/* Social Platforms */}
          <div className="space-y-3 mb-6">
            <h4 className="font-serif font-medium text-amber-800 text-sm">
              Share on social media
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {socialPlatforms.map((platform) => {
                const IconComponent = platform.icon;
                return (
                  <button
                    key={platform.name}
                    onClick={() => handleShare(platform.url)}
                    className={`flex items-center gap-3 px-4 py-3 ${platform.color} text-white rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105 font-medium text-sm`}
                  >
                    <IconComponent size={18} />
                    {platform.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Copy Link */}
          <div className="border-t border-amber-200/50 pt-4">
            <h4 className="font-serif font-medium text-amber-800 text-sm mb-3">
              Or copy link
            </h4>
            <div className="flex gap-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-3 py-2 bg-white/80 border border-amber-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
              <button
                onClick={copyToClipboard}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
                  copied
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-amber-100 hover:bg-amber-200 text-amber-700 border border-amber-200"
                }`}
              >
                <Link size={16} />
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BookReader({ book, isOpen, onClose }) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-2xl border-2 border-amber-200/50 w-full max-w-6xl h-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-amber-200/50 bg-gradient-to-r from-amber-100 to-orange-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-amber-600 to-orange-700 rounded-full shadow-lg">
              <BookOpen className="text-white" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-amber-900">
                {book.title}
              </h2>
              <p className="text-sm text-amber-700">by {book.author}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-amber-200/50 rounded-full transition-colors border border-amber-200/30"
          >
            <X className="text-amber-700" size={20} />
          </button>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 bg-gradient-to-br from-amber-50/30 to-orange-50/30 overflow-hidden">
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
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <>
      {/* Background with vintage pattern */}
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d97706' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative p-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-white/90 to-amber-50/90 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-amber-200/50 overflow-hidden">
              {/* Header */}
              <div className="p-6 bg-gradient-to-r from-amber-600 to-orange-700 text-white flex items-center shadow-lg">
                <button
                  onClick={onBack}
                  className="flex items-center mr-4 hover:bg-white/20 p-3 rounded-full transition-all duration-200 hover:shadow-lg"
                >
                  <ArrowLeft size={20} />
                </button>
                <div>
                  <h2 className="text-2xl font-serif font-bold">
                    Literary Collection
                  </h2>
                  <p className="text-amber-100 text-sm">
                    Discover timeless classics
                  </p>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:flex">
                {/* Left Column - Book Cover & Actions */}
                <div className="lg:w-1/3 p-8 bg-gradient-to-br from-amber-50/50 to-orange-50/50">
                  <div className="relative group">
                    <div className="rounded-2xl overflow-hidden shadow-2xl mx-auto max-w-xs transform transition-all duration-300 group-hover:scale-105">
                      <img
                        src={book.coverImageUrl}
                        alt={`${book.title} cover`}
                        className="w-full h-auto object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-4 mt-8">
                    <button
                      onClick={() => setIsReaderOpen(true)}
                      className="px-6 py-4 bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 text-white rounded-xl font-serif font-semibold transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      <BookOpen size={20} />
                      Begin Reading
                    </button>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setIsBookmarked(!isBookmarked)}
                        className={`flex-1 p-3 border-2 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 font-medium ${
                          isBookmarked
                            ? "bg-amber-100 border-amber-300 text-amber-700"
                            : "border-amber-200 hover:bg-amber-50 text-amber-600 hover:border-amber-300"
                        }`}
                      >
                        <Bookmark
                          size={18}
                          className={isBookmarked ? "fill-current" : ""}
                        />
                        {isBookmarked ? "Saved" : "Save"}
                      </button>

                      <button
                        onClick={() => setIsShareOpen(true)}
                        className="flex-1 p-3 border-2 border-amber-200 hover:bg-amber-50 hover:border-amber-300 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-amber-600 font-medium"
                      >
                        <Share size={18} />
                        Share
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Column - Book Details */}
                <div className="lg:w-2/3 p-8">
                  <div className="space-y-6">
                    {/* Title & Author */}
                    <div>
                      <h1 className="text-4xl font-serif font-bold text-amber-900 mb-3 leading-tight">
                        {book.title}
                      </h1>
                      <p className="text-xl text-amber-700 font-medium">
                        by {book.author}
                      </p>
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 rounded-full text-sm font-serif font-semibold border border-amber-200/50">
                        {book.category}
                      </span>
                      <div className="flex items-center gap-4 text-amber-600">
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                          {book.pages} pages
                        </span>
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                          Published: {book.published}
                        </span>
                      </div>
                    </div>

                    {/* Synopsis */}
                    <div className="bg-white/60 rounded-xl p-6 border border-amber-200/30 shadow-lg">
                      <h3 className="text-2xl font-serif font-bold text-amber-900 mb-4 flex items-center gap-2">
                        <div className="w-1 h-6 bg-gradient-to-b from-amber-600 to-orange-700 rounded-full"></div>
                        Synopsis
                      </h3>
                      <p className="text-amber-800 leading-relaxed text-lg font-serif">
                        {book.description}
                      </p>
                    </div>

                    {/* Highlights */}
                    {book.highlights && book.highlights.length > 0 && (
                      <div className="bg-gradient-to-br from-orange-50/80 to-yellow-50/80 rounded-xl p-6 border border-orange-200/30 shadow-lg">
                        <h3 className="text-2xl font-serif font-bold text-amber-900 mb-4 flex items-center gap-2">
                          <div className="w-1 h-6 bg-gradient-to-b from-orange-600 to-yellow-700 rounded-full"></div>
                          Notable Features
                        </h3>
                        <ul className="space-y-3">
                          {book.highlights.map((highlight, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-3 text-amber-800 font-serif"
                            >
                              <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="leading-relaxed">
                                {highlight}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <BookReader
        book={book}
        isOpen={isReaderOpen}
        onClose={() => setIsReaderOpen(false)}
      />

      <ShareModal
        book={book}
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />
    </>
  );
}

export default BookDetail;
