import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function HeaderCart() {
  const { t } = useTranslation();
  const [startX, setStartX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const deltaX = e.touches[0].clientX - startX;
    containerRef.current.scrollLeft -= deltaX;
    setStartX(e.touches[0].clientX);
  };

  return (
    <div
      className="grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => setStartX(0)}
      ref={containerRef}
    >
      <div className="col-span-6">
        <div className="flex items-center">
          <div className="flex flex-shrink-0 items-center justify-center pr-3">
            <input type="checkbox" className="h-5 w-5 accent-orange" />
          </div>
          <div className="flex-grow text-black">{t("cart.product")}</div>
        </div>
      </div>
      <div className="col-span-6">
        <div className="grid grid-cols-5 text-center">
          <div className="col-span-2">{t("cart.unit_price")}</div>
          <div className="col-span-1">{t("cart.quantity")}</div>
          <div className="col-span-1">{t("cart.amount")}</div>
          <div className="col-span-1">{t("cart.action")}</div>
        </div>
      </div>
    </div>
  );
}
