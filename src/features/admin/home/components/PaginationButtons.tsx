import React from "react";
import { IoArrowRedoOutline, IoArrowUndoOutline } from "react-icons/io5";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  setPage: (page: number) => void;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: () => void;
  nextPage: () => void;
};

const PaginationButtons: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  setPage,
  hasPrevPage,
  hasNextPage,
  prevPage,
  nextPage,
}) => {
  const getVisiblePages = () => {
    const pages = [];

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center mt-6 space-x-1 text-sm">
      <button
        onClick={prevPage}
        disabled={!hasPrevPage}
        className="h-[25px] w-[25px] flex justify-center items-center rounded-full text-gray-700 bg-white shadow hover:bg-gray-200 disabled:opacity-50"
      >
        <IoArrowUndoOutline />
      </button>

      {getVisiblePages().map((page) => (
        <button
          key={page}
          onClick={() => setPage(page)}
          className={`h-[25px] w-[25px] flex justify-center items-center rounded font-medium transition-all shadow ${
            page === currentPage
              ? "bg-admin-bg text-white"
              : "bg-white text-gray-800 hover:bg-gray-200"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={nextPage}
        disabled={!hasNextPage}
        className="h-[25px] w-[25px] flex justify-center items-center rounded-full text-gray-700 bg-white shadow hover:bg-gray-200 disabled:opacity-50"
      >
        <IoArrowRedoOutline />
      </button>
    </div>
  );
};

export default PaginationButtons;
