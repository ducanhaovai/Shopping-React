import { useEffect, useState } from "react";
import { fetchCategories } from "../../../api/productApi";
import { useTranslation } from "react-i18next";
type Category = {
  id: string;
  name: string;
};
type CategoryProps = {
  onCategoryClick?: (categoryId: string) => void;
};

export default function Category({ onCategoryClick }: CategoryProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const { t } = useTranslation();
  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getCategories();
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    if (onCategoryClick) {
      onCategoryClick(categoryId);
    }
  };

  return (
    <ul>
      {categories &&
        categories.slice(0, 5).map((category) => (
          <li
            key={category.id}
            className="py-2 pl-2 hover:text-red-500"
            onClick={() => handleCategoryClick(category.id)}
          >
            <a className="relative px-2">
              {t(`category.${category.name.toLowerCase()}`)}
            </a>
          </li>
        ))}
    </ul>
  );
}
