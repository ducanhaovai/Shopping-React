import { useTranslation } from "react-i18next";
import { useState } from "react";

// Định nghĩa kiểu dữ liệu của props
interface AsideUserProps {
  handleSelectSection: (section: string) => void;
}

// Sử dụng kiểu dữ liệu đã định nghĩa trong props
export default function AsideUser({ handleSelectSection }: AsideUserProps) {
  const { t } = useTranslation();
  const [selectedSection, setSelectedSection] = useState("");

  return (
    <div className="mt-7">
      <a
        className={`${
          selectedSection === "profile" ? "text-orange" : "text-gray-600"
        } flex items-center capitalize transition-colors`}
        onClick={() => {
          handleSelectSection("profile");
          setSelectedSection("profile");
        }}
      >
        <div className="mr-3 h-[22px] w-[22px]">
          <img
            src="https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4"
            alt=""
            className="h-full w-full"
          />
        </div>
        {t("profile.My Account")}
      </a>
      <a
        className={`${
          selectedSection === "changePassword" ? "text-orange" : "text-gray-600"
        } mt-4 flex items-center capitalize transition-colors`}
        onClick={() => {
          handleSelectSection("changePassword");
          setSelectedSection("changePassword");
        }}
      >
        <div className="mr-3 h-[22px] w-[22px]">
          <img
            src="https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4"
            alt=""
            className="h-full w-full"
          />
        </div>
        {t("profile.Change Password")}
      </a>
      {/*
      <a
        className={`${
          selectedSection === "purchaseOrders" ? "text-orange" : "text-gray-600"
        } mt-4 flex items-center capitalize transition-colors`}
        onClick={() => {
          handleSelectSection("purchaseOrders");
          setSelectedSection("purchaseOrders");
        }}
      >
        <div className="mr-3 h-[22px] w-[22px]">
          <img
            src="https://cf.shopee.vn/file/f0049e9df4e536bc3e7f140d071e9078"
            alt=""
            className="h-full w-full"
          />
        </div>
        {t("profile.Purchase Orders")}
      </a>
      */}
    </div>
  );
}
