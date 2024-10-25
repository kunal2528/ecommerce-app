import React from 'react';
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

const Pagination = ({ page, setPage, totalPages }) => {
  const getPageNumbers = () => {
    const maxVisiblePages = 5;
    let start = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let end = start + maxVisiblePages - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    const pageNumbers = [];
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center my-6">
      <button
        className="px-4 py-2 mr-2 bg-gray-100 rounded flex items-center disabled:opacity-50 lg:hidden"
        disabled={page <= 1}
        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
      >
        <FaAngleLeft />
      </button>
      <button
        className="px-4 py-2 mr-2 bg-gray-100 rounded lg:flex items-center disabled:opacity-50 hidden"
        disabled={page <= 1}
        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
      >
        <FaAngleLeft /> Previous
      </button>

      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`px-4 py-2 mx-1 rounded ${page === pageNumber ? 'bg-slate-700 text-white' : 'bg-gray-100'}`}
          onClick={() => setPage(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      <button
        className="px-4 py-2 ml-2 bg-gray-100 rounded flex items-center disabled:opacity-50 lg:hidden"
        disabled={page >= totalPages}
        onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
      >
        <FaAngleRight />
      </button>
      <button
        className="px-4 py-2 ml-2 bg-gray-100 rounded lg:flex items-center disabled:opacity-50 hidden"
        disabled={page >= totalPages}
        onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
      >
        Next <FaAngleRight />
      </button>
    </div>
  );
};

export default Pagination;
