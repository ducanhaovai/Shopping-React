import React from "react";

import Footer from "../../components/Footer/Footer";
import HomeHeader from "../../components/HomeHeader";

interface Props {
  children?: React.ReactNode;
}

export default function UserDetailLayout({ children }: Props) {
  return (
    <div className="flex h-screen flex-col justify-between">
      <HomeHeader />

      {children}

      <Footer />
    </div>
  );
}
