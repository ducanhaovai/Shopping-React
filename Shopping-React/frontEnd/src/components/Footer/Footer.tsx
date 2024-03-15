import React from "react";

export default function Footer() {
  return (
    <footer className="py-16 bg-neutral-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1">
            <div>© 2024 Shopee. Tất cả các quyền được bảo lưu.</div>
          </div>
          <div className="lg:col-span-2">
            <div>
              Quốc gia & Khu vực: Singapore Indonesia Thái Lan Malaysia Việt Nam
              Philippines Brazil México Colombia Chile Đài Loan
            </div>
          </div>
        </div>
        <div className="text-center text-sm mt-10">
          <div>Công ty TNHH Shopee</div>
          <div className="mt-2">Địa chỉ: Viet Name</div>
          <div className="mt-2">
            Chịu Trách Nhiệm Quản Lý Nội Dung: Duc Anh Mai
          </div>
          <div className="mt-2">
            © 2015 - Bản quyền thuộc về Công ty TNHH Shop
          </div>
        </div>
      </div>
    </footer>
  );
}
