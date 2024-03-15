import React from "react";

import Footer from "../../components/Footer/Footer";
import HomeHeader from "../../components/HomeHeader";

interface Props {
  children?: React.ReactNode;
}

export default function HomeLayout({ children }: Props) {
  return (
    <div>
      <HomeHeader />

      {children}
      <Footer />
    </div>
  );
}
