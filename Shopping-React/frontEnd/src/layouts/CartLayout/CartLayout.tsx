import React from "react";
import HomeHeader from "../../components/HomeHeader";
import Footer from "../../components/Footer";

interface Props {
  children?: React.ReactNode;
}

export default function CartLayout({ children }: Props) {
  return (
    <div className="flex h-screen flex-col justify-between">
      <HomeHeader
        handleSearch={function (_searchTerm: string): void {
          throw new Error("Function not implemented.");
        }}
      />
      <div className="bg-neutral-100 py-16">{children}</div>
      
      <Footer />
    </div>
  );
}
