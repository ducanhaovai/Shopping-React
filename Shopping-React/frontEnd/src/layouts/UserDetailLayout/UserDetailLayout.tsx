import { SetStateAction, useState } from "react";
import Footer from "../../components/Footer/Footer";
import HomeHeader from "../../components/HomeHeader";
import ChangPassPage from "../../pages/ChangPass/ChangPassPage";
import UserDetail from "../../pages/UserDetail";
import AsideUser from "../../components/Aside/AsideUser";

export default function UserDetailLayout() {
  const [selectedSection, setSelectedSection] = useState("profile");

  const handleSelectSection = (section: SetStateAction<string>) => {
    setSelectedSection(section);
  };

  const renderSelectedSection = () => {
    switch (selectedSection) {
      case "profile":
        return <UserDetail />;
      case "changePassword":
        return <ChangPassPage />;
      default:
        return <UserDetail />;
    }
  };

  return (
    <div className="flex h-screen flex-col justify-between">
      <HomeHeader handleSearch={() => console.log("Thanh cong")} />
      <div className="bg-neutral-100 py-16 text-sm text-gray-600">
        <div className="container">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            <div className="md:col-span-3 lg:col-span-2">
              <AsideUser handleSelectSection={handleSelectSection} />
            </div>
            {renderSelectedSection()}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
