import React from "react";

import Footer from "../../components/Footer/Footer";
import HomeHeader from "../../components/HomeHeader";

interface Props {
  children?: React.ReactNode;
}

export default function ProductDetailLayout({ children }: Props) {
  const handleSearch = () => {
    console.log("thanh cong");
  };
  return (
    <div className="flex h-screen flex-col justify-between">
      <HomeHeader handleSearch={handleSearch} />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
}
