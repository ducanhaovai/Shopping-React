import React, { useState } from "react";
import Footer from "../../components/Footer/Footer";
import HomeHeader from "../../components/HomeHeader";
import Aside from "../../components/Aside";
import Tophome from "../../components/TopHome";

interface Props {
  children?: React.ReactNode;
}

export default function HomeLayout({ children }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value) => {
    setSearchTerm(value);
  };
  return (
    <div className="flex h-screen flex-col justify-between">
      <HomeHeader handleSearch={handleSearch} />
      <div className="flex-grow">
        <div className="container pb-4">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-3">
              <Aside />
            </div>
            <div className="col-span-9">
              <Tophome />
              {children}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
