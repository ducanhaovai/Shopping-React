import { useEffect, useState } from "react";
import Logo from "./components/Logo";
import Search from "./components/Search";
import UserLogin from "./components/UserLogin";
import Cart from "./components/Cart";
import List from "./components/List";
import { fetchCategories } from "../../api/productApi";
import { useTranslation } from "react-i18next";

type Category = {
  id: string;
  name: string;
};

type HandleSearchFunction = (searchTerm: string) => void;

export default function HomeHeader({
  handleSearch,
}: {
  handleSearch: HandleSearchFunction;
}) {
  const [categories, setCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { t } = useTranslation();

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const data = await fetchCategories();
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    };

    fetchCat();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <header className="bg-[linear-gradient(-180deg,#f53d2d,#f63)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between space-x-4 py-2 z-2 s">
          <List />
          <UserLogin />
        </div>

        <nav className="h-[var(--header-with-search-height)] flex items-start mx-2 gap-4 pt-4">
          <Logo />

          <div className="flex-shrink flex flex-col">
            <form onSubmit={handleSubmit}>
              <label className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {t("search.placeholder")}
              </label>
              <Search handleSearch={setSearchTerm} />
            </form>

            <ul className="hidden sm:flex flex-wrap items-center">
              {categories.slice(0, 5).map((category, index) => (
                <li key={index} className="my-2 sm:mx-2">
                  <a className="text-sm text-white">
                    {t(`category.${category.toLowerCase()}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <Cart />
        </nav>
      </div>
    </header>
  );
}
