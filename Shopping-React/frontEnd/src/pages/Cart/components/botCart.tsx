type BotCartProps = {
  selectedItems: boolean[];
  onSelectAll: () => void;
  totalCost: number;
};
import { useTranslation } from "react-i18next";

export default function BotCart({
  selectedItems,
  onSelectAll,
  totalCost,
}: BotCartProps) {
  const { t } = useTranslation();
  const selectedCount = selectedItems.filter((item) => item).length;

  return (
    <>
      <div className="flex items-center">
        <div className="flex flex-shrink-0 items-center justify-center pr-3">
          <input
            type="checkbox"
            checked={selectedItems.every((item) => item)}
            onChange={onSelectAll}
          />
        </div>
        <button className="mx-3 border-none bg-none">
          {t("cart.select_all")} ({selectedCount})
        </button>
        <button className="mx-3 border-none bg-none">{t("cart.delete")}</button>
      </div>
      <div className="mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center sm:justify-end">
            <div>
              {t("cart.total_payment")} ({selectedCount} {t("cart.products")} ):
            </div>
            <div className="ml-2 text-2xl text-orange">${totalCost}</div>
          </div>
        </div>
        <button className="mt-5 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0">
          <span>{t("cart.buy")}</span>
        </button>
      </div>
    </>
  );
}
