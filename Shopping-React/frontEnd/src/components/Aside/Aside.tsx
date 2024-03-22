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
    </div>
  );
}
