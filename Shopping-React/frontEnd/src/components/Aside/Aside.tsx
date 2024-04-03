import Allfile from "./components/Allfile";
import Category from "./components/Category";
import Price from "./components/Price";
import Search from "./components/Search";

export default function Aside({ onCategoryClick }) {
  return (
    <div className="py-4">
      <div className="my-4 h-0.5 bg-gray-300"></div>
      <Allfile />
      <Category onCategoryClick={onCategoryClick} />
      <div className="my-4 h-0.5 bg-gray-300"></div>
      <Search />
      <Price />
    </div>
  );
}
