import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

type CartItem = {
  productId: number;
  title: string;
  description: string;
  quantity: number;
  price: number;
  image: string;
};

type ProductCartProps = {
  cartItems: CartItem[];
  selectedItems: boolean[];
  onSelectItem: (index: number) => void;
  onDeleteItem: (productId: number) => void;
};

export default function ProductCart({
  cartItems,
  selectedItems,
  onSelectItem,
  onDeleteItem,
}: ProductCartProps) {
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
      className="my-3 rounded-sm bg-white p-5 shadow"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => setStartX(0)}
      ref={containerRef}
    >
      {cartItems.map((item, index) => (
        <div
          key={item.productId}
          className="mb-5 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white py-5 px-4 text-center text-sm text-gray-500 first:mt-0 "
        >
          <div className="col-span-6">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center justify-center pr-3">
                <input
                  type="checkbox"
                  checked={selectedItems[index]}
                  onChange={() => onSelectItem(index)}
                />
              </div>
              <div className="flex-grow">
                <div className="flex justify-center items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-20 flex-shrink-0"
                  />
                  <div className="flex-grow px-2 pt-1 pb-2">
                    <p className="line-clamp-2">{item.title}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-6">
            <div className="grid grid-cols-5 items-center">
              <div className="col-span-2">
                <div className="flex items-center justify-center"></div>
                <span className="text-gray-300 line-through ">$120</span>
                <span className="ml-3">${item.price}</span>
              </div>
              <div className="col-span-1">
                <div className="flex items-center ">
                  <div className="">
                    <p className="h-8 w-14  border-gray-300 p-1 text-center">
                      {item.quantity}
                    </p>

                    <div className="hidden"></div>
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <p className="text-orange">${item.price * item.quantity}</p>
              </div>
              <div className="col-span-1">
                <button
                  className="bg-none text-black transition-colors hover:text-orange"
                  onClick={() => onDeleteItem(item.productId)}
                >
                  {t("cart.delete")}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
