import React from "react";

export default function Category() {
  return (
    <ul>
      <li className="py-2 pl-2 hover:text-gray-500">
        <a className="relative px-2">Áo thun</a>
      </li>
      <li className="py-2 pl-2 hover:text-gray-500">
        <a className="relative px-2">Đồng hồ</a>
      </li>
      <li className="py-2 pl-2 hover:text-gray-500">
        <a className="relative px-2">Điện thoại</a>
      </li>
    </ul>
  );
}
