import React from "react";
import Input from "../../Input";

export default function Price() {
  return (
    <form className="mt-2">
      <div>Giá</div>
      <div className="mb-2 flex items-start">
        <div>
          <div className="false py-1 default-input">
            <Input name="price_min" type="text" placeholder="₫ ĐẾN" />
          </div>
        </div>
        <div className="mx-2 mt-2 shrink-0">-</div>
        <div>
          <div className="false py-1 default-input">
            <Input name="price_max" type="text" placeholder="₫ ĐẾN" />
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="flex items-center outline-none transition duration-300 bg-primary text-white flex items-center space-x-2 rounded-md px-4 py-2 hover:bg-opacity-80"
      >
        Áp dụng
      </button>
    </form>
  );
}
