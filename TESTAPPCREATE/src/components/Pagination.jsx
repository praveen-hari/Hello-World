export default function Pagination({ currentPage, totalItems, itemsPerPage, onPageChange }) {
  // BUG #4 (Pagination): Broken pagination logic — total pages calculated with floor instead of ceil
  const totalPages = Math.floor(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-medium transition-colors"
      >
        ← Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
            currentPage === page
              ? 'bg-primary border-primary text-black'
              : 'border-gray-300 hover:bg-gray-100'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-medium transition-colors"
      >
        Next →
      </button>
    </div>
  );
}
