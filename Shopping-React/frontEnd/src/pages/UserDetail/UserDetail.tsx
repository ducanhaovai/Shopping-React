import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import AsideUser from "../../components/Aside/AsideUser";
import UserForm from "../../components/UserDetail";

export default function UserDetail() {
  return (
    <div className=" flex-grow">
      <div className="bg-neutral-100 py-16 text-sm text-gray-600">
        <div className="container">
          <div className="mt-8 flex flex-col-reverse md:flex-row md:items-start">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
              <div className="md:col-span-3 lg:col-span-2">
                <AsideUser />
              </div>
              <div className="md:col-span-9 lg:col-span-10">
                <UserForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
