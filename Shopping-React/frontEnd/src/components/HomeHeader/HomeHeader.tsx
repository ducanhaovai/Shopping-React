import React, { useState } from "react";
import Logo from "./components/Logo";
import Search from "./components/Search";
import UserLogin from "./components/UserLogin";
import Cart from "./components/Cart";

export default function HomeHeader({ handleSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

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
