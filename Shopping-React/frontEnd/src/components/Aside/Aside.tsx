import React from "react";
import Input from "../Input";

import { Star1, Star2, Star3, Star4, Star5 } from "../Star/Star";
import Allfile from "./components/Allfile";
import Category from "./components/Category";
import Search from "./components/Search";
import Price from "./components/Price";

export default function Aside() {
  return (
    <div className="py-4">
      <Allfile />
      <Category />
      <div className="my-4 h-0.5 bg-gray-300"></div>

      <Search />
      <div className="my-4 h-[1px] bg-gray-300"></div>
      <div className="my-5">
        <Price />
        <div className="my-4 h-[1px] bg-gray-300"></div>
        <div className="text-sm">Đánh giá</div>
        <Star5 />
        <Star4 />
        <Star3 />
        <Star2 />
        <Star1 />
        <div className="my-4 h-[1px] bg-gray-300"></div>
        <button
          type="button"
          className="flex items-center outline-none transition duration-300 bg-primary text-white flex items-center space-x-2 rounded-md px-4 py-2 hover:bg-opacity-80"
        >
          Xóa tất cả
        </button>
      </div>
    </div>
  );
}
