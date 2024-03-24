export default function AsideUser() {
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
        Tài khoản của tôi
      </a>
      <a className="mt-4 flex items-center capitalize text-gray-600 transition-colors">
        <div className="mr-3 h-[22px] w-[22px]">
          <img
            src="https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4"
            alt=""
            className="h-full w-full"
          />
        </div>
        Đổi mật khẩu
      </a>
      <a className="mt-4 flex items-center capitalize text-gray-600 transition-colors">
        <div className="mr-3 h-[22px] w-[22px]">
          <img
            src="https://cf.shopee.vn/file/f0049e9df4e536bc3e7f140d071e9078"
            alt=""
            className="h-full w-full"
          />
        </div>
        Đơn mua
      </a>
    </div>
  );
}
