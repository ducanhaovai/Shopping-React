import React, { useState } from "react";
import Logo from "./components/Logo";
import Search from "./components/Search";
import UserLogin from "./components/UserLogin";
import Cart from "./components/Cart";

export default function HomeHeader() {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (searchTerm) => {
    // Đây là nơi để xử lý dữ liệu khi nhận được từ component Search
    console.log("Search term sent to parent component:", searchTerm);
    // Thực hiện các xử lý khác ở đây (nếu cần)
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    console.log("Search term:", event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    handleSearch(searchTerm);
    console.log("handleSubmit", handleSubmit);
  };

  return (
    <header className="bg-[linear-gradient(-180deg,#f53d2d,#f63)]">
      <div className="container">
        <UserLogin />
        <nav className="grid w-full grid-cols-10 space-x-4 py-4">
          <Logo />
          <form className="col-span-7" onSubmit={handleSubmit}>
            <label className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Search
            </label>
            <Search handleSearch={handleSearch} />
          </form>
          <Cart />
        </nav>
      </div>
    </header>
  );
}
