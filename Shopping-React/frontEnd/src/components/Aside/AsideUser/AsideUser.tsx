import React from "react";

export default function AsideUser() {
  return (
    <div>
      <div className="flex items-center border-b border-b-gray-200 py-4">
        <a className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black/10">
          <img
            src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
            className="h-full w-full object-cover"
          />
        </a>
        <div className="flex-grow pl-4">
          <div className="mb-1 truncate font-semibold text-gray-600">
            <a className="flex items-center capitalize text-gray-500">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                xmlns="http://www.w3.org/2000/svg"
                className="margin-right: 4px;"
              >
                <path
                  d="M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48"
                  fill="#9B9B9B"
                  fillRule="evenodd"
                ></path>
              </svg>
              Sửa hồ sơ.
            </a>
          </div>
        </div>
      </div>
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
    </div>
  );
}
