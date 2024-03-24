import { SetStateAction, useState } from "react";
import Footer from "../../components/Footer/Footer";
import HomeHeader from "../../components/HomeHeader";
import Aside from "../../components/Aside";
import Tophome from "../../components/TopHome";

import Home from "../../pages/Home";

export default function HomeLayout() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex h-screen flex-col justify-between">
      <HomeHeader
        handleSearch={(value: SetStateAction<string>) => setSearchTerm(value)}
      />
      <div className="flex-grow">
        <div className="container pb-4">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-3">
              <Aside />
            </div>
            <div className="col-span-9">
              <Tophome />
              <Home searchTerm={searchTerm} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
