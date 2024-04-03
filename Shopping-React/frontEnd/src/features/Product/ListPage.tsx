export default function ListPage({
  totalPages,
  currentPage,
  handlePagination,
}: {
  totalPages: number;
  currentPage: number;
  handlePagination: (page: number) => void;
}) {
  let startPage, endPage;
  if (totalPages <= 6) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= 4) {
      startPage = 1;
      endPage = 6;
    } else if (currentPage + 2 >= totalPages) {
      startPage = totalPages - 5;
      endPage = totalPages;
    } else {
      startPage = currentPage - 2;
      endPage = currentPage + 3;
    }
  }

  const pageNumbers = [...Array(endPage + 1 - startPage).keys()].map(
    (i) => startPage + i
  );

  return (
    <div className="mt-4">
      <ul className="flex justify-center">
        {pageNumbers.map((page, index) => {
          if (page === startPage && page !== 1) {
            return <span key={`start${index}`}>... </span>;
          }
          if (page === endPage && page !== totalPages) {
            return <span key={`end${index}`}> ...</span>;
          }
          return (
            <li key={page} className="mr-2">
              <button
                onClick={() => handlePagination(page)}
                className={`px-3 py-1 rounded-full ${
                  currentPage === page
                    ? "bg-orange text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {page}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
