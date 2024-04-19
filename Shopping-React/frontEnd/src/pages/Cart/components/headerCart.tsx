import { useTranslation } from "react-i18next";

export default function HeaderCart() {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-12 rounded-sm bg-white px-9 py-5 text-sm capitalize text-gray-500 shadow">
      <div className="col-span-6">
        <div className="flex items-center">
          <div className="flex flex-shrink-0 items-center justify-center pr-3">
            <input type="checkbox" className="h-5 w-5 accent-orange" />
          </div>
          <div className="flex-grow text-black">{t("cart.product")}</div>
        </div>
      </div>
      <div className="col-span-6">
        <div className="grid grid-cols-1 sm:grid-cols-5 text-center">
          <div className="col-span-2">{t("cart.unit_price")}</div>
          <div className="col-span-1">{t("cart.quantity")}</div>
          <div className="col-span-1">{t("cart.amount")}</div>
          <div className="col-span-1">{t("cart.action")}</div>
        </div>
      </div>
    </div>
  );
}
