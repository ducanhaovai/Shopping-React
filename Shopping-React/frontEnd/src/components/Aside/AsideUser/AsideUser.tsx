import { useTranslation } from "react-i18next";

export default function AsideUser() {
  const { t } = useTranslation();

  return (
    <div className="mt-7">
      <a className="text-orange flex items-center capitalize transition-colors">
        <div className="mr-3 h-[22px] w-[22px]">
          <img
            src="https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4"
            alt=""
            className="h-full w-full"
          />
        </div>
        {t("profile.My Account")}
      </a>
      <a className="mt-4 flex items-center capitalize text-gray-600 transition-colors">
        <div className="mr-3 h-[22px] w-[22px]">
          <img
            src="https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4"
            alt=""
            className="h-full w-full"
          />
        </div>
        {t("profile.Change Password")}
      </a>
      <a className="mt-4 flex items-center capitalize text-gray-600 transition-colors">
        <div className="mr-3 h-[22px] w-[22px]">
          <img
            src="https://cf.shopee.vn/file/f0049e9df4e536bc3e7f140d071e9078"
            alt=""
            className="h-full w-full"
          />
        </div>
        {t("profile.Purchase Orders")}
      </a>
    </div>
  );
}
