
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Input from "../../components/Input";
import AsideUser from "../../components/Aside/AsideUser";

export default function UserDetail() {
  return (
    <div className=" flex-grow">
      <div className="bg-neutral-100 py-16 text-sm text-gray-600">
        <div className="container">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            <div className="md:col-span-3 lg:col-span-2">
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
                        Sửa hồ sơ
                      </a>
                    </div>
                  </div>
                </div>

                <AsideUser />
              </div>
            </div>
            <div className="md:col-span-9 lg:col-span-10">
              <div className="rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20">
                <div className="border-b border-b-gray-200 py-6">
                  <h1 className="text-lg font-medium capitalize text-gray-900">
                    Hồ Sơ Của Tôi
                  </h1>
                  <div className="mt-1 text-sm text-gray-700">
                    Quản lý thông tin hồ sơ để bảo mật tài khoản
                  </div>
                </div>
                <form className="mt-8 flex flex-col-reverse md:flex-row md:items-start">
                  <div className="mt-6 flex-grow md:mt-0 md:pr-12">
                    <div className="flex flex-col flex-wrap sm:flex-row">
                      <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
                        Email
                      </div>
                      <div className="sm:w-[80%] sm:pl-5">
                        <div className="pt-3 text-gray-700">
                          ducanhmai9161@gmail.com
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex flex-col flex-wrap sm:flex-row">
                      <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
                        Tên
                      </div>
                      <div className="sm:w-[80%] sm:pl-5">
                        <div>
                          <div className="false py-1 default-input">
                            <Input type="text" name="name" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
                      <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
                        Số điện thoại
                      </div>
                      <div className="sm:w-[80%] sm:pl-5">
                        <div>
                          <div className="false py-1 default-input">
                            <Input type="text" name="phone_number" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
                      <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
                        Địa chỉ
                      </div>
                      <div className="sm:w-[80%] sm:pl-5">
                        <div>
                          <div className="false py-1 default-input">
                            <Input type="text" name="Address" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
                      <div className="flex justify-end truncate pt-3 capitalize sm:w-[33%] sm:text-right">
                        <button
                          type="submit"
                          className="flex items-center outline-none transition duration-300 bg-primary text-white flex items-center space-x-2 rounded-md px-4 py-2 hover:bg-opacity-80 px-5"
                        >
                          Lưu
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
