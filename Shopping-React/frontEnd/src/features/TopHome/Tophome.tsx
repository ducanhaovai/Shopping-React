import React from "react";

export default function Tophome() {
  return (
    <div className="bg-gray-300/40 py-4 px-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <div>Sắp xếp theo</div>
          <button className="h-8 px-4 text-center text-sm capitalize  bg-white text-black hover:bg-slate-100">
            Phổ biến
          </button>
          <button className="h-8 px-4 text-center text-sm capitalize  bg-primary text-white hover:bg-primary/80">
            Mới nhất
          </button>
          <button className="h-8 px-4 text-center text-sm capitalize  bg-white text-black hover:bg-slate-100">
            Bán chạy
          </button>
          <select className="h-8 px-4 text-left text-sm capitalize text-black outline-none  bg-white text-black hover:bg-slate-100">
            <option value="" className="bg-white text-black">
              Giá
            </option>
            <option value="asc" className="bg-white text-black">
              Giá: Thấp đến cao
            </option>
            <option value="desc" className="bg-white text-black">
              Giá: Cao đến thấp
            </option>
          </select>
        </div>
      </div>
    </div>
  );
}
