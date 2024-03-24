import React from "react";

import Footer from "../../components/Footer/Footer";
import HomeHeader from "../../components/HomeHeader";
import UserDetail from "../../pages/UserDetail";

export default function UserDetailLayout() {
  const handleSearch = (value: string) => {
    console.log("Thanh cong");
  };
  return (
    <div className="flex h-screen flex-col justify-between">
      <HomeHeader handleSearch={handleSearch} />

      <UserDetail />
      <Footer />
    </div>
  );
}
