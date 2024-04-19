import { SetStateAction, useState } from "react";
import { searchProducts } from "../../../api/productApi";
import { useTranslation } from "react-i18next";
interface SearchProps {
  handleSearch: (query: string) => void;
}
export default function Search({ handleSearch }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchTerm(event.target.value);
  };

  const search = async () => {
    try {
      const products = await searchProducts(searchTerm);

      handleSearch(products);
      setError(null);
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  return (
    <>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 1024 1024"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
          </svg>
        </div>

        <input
          type="search"
          value={searchTerm}
          onChange={handleChange}
          className="block w-full rounded-sm border-none border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 outline-none"
          placeholder={t("tophead.search-product")}
          required
        />
        <button
          type="button"
          onClick={search}
          className="flex items-center outline-none transition duration-300 bg-primary text-white space-x-2 rounded-md px-4 py-2 hover:bg-opacity-80 absolute right-2.5 bottom-2.5  bg-red-600"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 1024 1024"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
          </svg>
        </button>
      </div>
      {error && <div className="text-red-500">{error}</div>}
    </>
  );
}
