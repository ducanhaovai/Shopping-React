export default function HeaderCart() {
  return (
    <div className="grid grid-cols-12 rounded-sm bg-white px-9 py-5 text-sm capitalize text-gray-500 shadow ">
      <div className="col-span-6">
        <div className="flex items-center">
          <div className="flex flex-shrink-0 items-center justify-center pr-3">
            <input type="checkbox" className="h-5 w-5 accent-orange" />
          </div>
          <div className="flex-grow text-black">Sản phẩm</div>
        </div>
      </div>
      <div className="col-span-6">
        <div className="grid grid-cols-5 text-center">
          <div className="col-span-2">Đơn giá</div>
          <div className="col-span-1">Số lượng</div>
          <div className="col-span-1">Số tiền</div>
          <div className="col-span-1">Thao tác</div>
        </div>
      </div>
    </div>
  );
}
