import  { useState, useEffect } from "react";
import Allfile from "./components/Allfile";
import Category from "./components/Category";
import Price from "./components/Price";
import Search from "./components/Search";

interface AsideProps {
  onCategoryClick: (categoryId: string) => void;
  onPriceChange: (products: any[]) => void;
}

export default function Aside({ onCategoryClick, onPriceChange }: AsideProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener("resize", checkIfMobile);
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  return (
    <div className="py-4 sm:block">
      {isMobile && (
        <button className="sm:hidden" onClick={toggleMenu}>
          Menu
        </button>
      )}
      {isOpen || !isMobile ? (
        <>
          <div className="my-4 h-0.5 bg-gray-300"></div>
          <Allfile />
          <Category onCategoryClick={onCategoryClick} />
          <div className="my-4 h-0.5 bg-gray-300"></div>
          <Search />
          <Price onPriceChange={onPriceChange} />
        </>
      ) : null}
    </div>
  );
}
