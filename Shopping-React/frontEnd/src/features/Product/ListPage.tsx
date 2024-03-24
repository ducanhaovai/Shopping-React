export default function ListPage({
  totalPages,
  currentPage,
  handlePagination,
}: {
  totalPages: number;
  currentPage: number;
  handlePagination: (page: number) => void;
}) {
  return (
    <div className="mt-4">
      <ul className="flex justify-center">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <li key={page} className="mr-2">
            <button
              onClick={() => handlePagination(page)}
              className={`px-3 py-1 rounded-full ${
                currentPage === page
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
