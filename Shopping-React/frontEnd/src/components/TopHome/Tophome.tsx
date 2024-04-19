import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "./components/Button";

interface TophomeProps {
  onPriceChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
export default function Tophome({ onPriceChange }: TophomeProps) {
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const { t } = useTranslation();

  const handleButtonClick = (buttonLabel: string) => {
    setActiveButton(buttonLabel);
  };

  return (
    <>
      <div className="bg-gray-300/40 py-4 px-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <div>{t("tophead.sort_by")}</div>
            <Button
              label={t("tophead.popular")}
              isActive={activeButton === t("tophead.popular")}
              onClick={() => handleButtonClick(t("tophead.popular"))}
            />
            <Button
              label={t("tophead.newest")}
              isActive={activeButton === t("tophead.newest")}
              onClick={() => handleButtonClick(t("tophead.newest"))}
            />
            <Button
              label={t("tophead.best_selling")}
              isActive={activeButton === t("tophead.best_selling")}
              onClick={() => handleButtonClick(t("tophead.best_selling"))}
            />
            <select
              className="h-8 px-4 text-left text-sm capitalize outline-none  bg-white text-black hover:bg-slate-100"
              onChange={onPriceChange}
            >
              <option value="" className="bg-white text-black">
                {t("tophead.price")}
              </option>
              <option value="asc" className="bg-white text-black">
                {t("tophead.price_low_to_high")}
              </option>
              <option value="desc" className="bg-white text-black">
                {t("tophead.price_high_to_low")}
              </option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
