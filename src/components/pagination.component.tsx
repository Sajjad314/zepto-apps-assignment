interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }
  
  const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
  }) => {
    const getPageNumbers = () => {
      const pagesToShow = 5; // Max number of pages to display
      const halfPages = Math.floor(pagesToShow / 2);
  
      let startPage = Math.max(1, currentPage - halfPages);
      let endPage = Math.min(totalPages, currentPage + halfPages);
  
      // Adjust if the start or end is out of range
      if (currentPage <= halfPages) {
        endPage = Math.min(totalPages, pagesToShow);
      } else if (currentPage + halfPages >= totalPages) {
        startPage = Math.max(1, totalPages - pagesToShow + 1);
      }
  
      const pages: (number | string)[] = [];
  
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push("..."); // Add ellipsis if there are hidden pages between 1 and startPage
      }
  
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
  
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push("..."); // Add ellipsis if there are hidden pages between endPage and totalPages
        pages.push(totalPages);
      }
  
      return pages;
    };
  
    return (
      <div className="flex justify-center mt-6 space-x-2">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 border rounded-md ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
  
        {/* Page Numbers */}
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && onPageChange(page)}
            disabled={typeof page !== "number"}
            className={`px-4 py-2 border rounded-md ${
              page === currentPage
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            } ${typeof page !== "number" ? "cursor-default" : ""}`}
          >
            {page}
          </button>
        ))}
  
        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 border rounded-md ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    );
  };
  
  export default Pagination;
  