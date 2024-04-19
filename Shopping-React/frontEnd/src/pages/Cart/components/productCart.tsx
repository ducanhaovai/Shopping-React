import React from "react";
import { useTranslation } from "react-i18next";

type CartItem = {
  productId: number;
  title: string;
  description: string;
  quantity: number;
  price: number;
  images: string;
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
  return (
    <div className="my-3 rounded-sm bg-white p-5 shadow">
      {cartItems.map((item, index) => (
        <React.Fragment key={item.productId}>
          <div className="mb-5 grid grid-cols-1 sm:grid-cols-12 items-center rounded-sm border border-gray-200 bg-white px-4 py-5 text-center text-sm text-gray-500 first:mt-0">
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
                  <div className="flex">
                    <img
                      src={item.images}
                      alt={item.title}
                      className="h-20 w-20 flex-shrink-0"
                    />
                    <div className="flex-grow px-2 pb-2 pt-1">
                      <p className="text-left line-clamp-2">{item.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-6">
              <div className="grid grid-cols-1 sm:grid-cols-5 items-center ">
                <div className="col-span-2 text-gray-500 line-through">
                  <p className="text-sm">$120</p>
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
        </React.Fragment>
      ))}
    </div>
  );
}
