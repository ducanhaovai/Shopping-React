import React, { useState } from "react";
import Footer from "../../components/Footer/Footer";
import HomeHeader from "../../components/HomeHeader";
import Aside from "../../components/Aside";
import Tophome from "../../components/TopHome";
import axios from "axios";
import Home from "../../pages/Home";

export default function HomeLayout({ children }: Props) {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (value) => {
    try {
      const response = await axios.get(
        `http://localhost:8088/search-products?title=${value}`
      );
      console.log("value", value);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching products:", error);
      setSearchResults([]);
    }
  };

  return (
    <div className="flex h-screen flex-col justify-between">
      <HomeHeader handleSearch={(value) => setSearchTerm(value)} />{" "}
      <div className="flex-grow">
        <div className="container pb-4">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-3">
              <Aside />
            </div>
            <div className="col-span-9">
              <Tophome searchResults={searchResults} />
              <Home searchTerm={searchTerm} />{" "}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
