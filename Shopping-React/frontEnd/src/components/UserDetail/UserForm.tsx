import { useEffect, useState } from "react";

import axios from "axios";
import Input from "../Input";
import { useForm } from "react-hook-form";

export default function UserForm() {
  const [user, setUser] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
  } | null>(null);

  const { register, handleSubmit, setValue } = useForm();
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    axios
      .get("https://shopping-react-sjvr.vercel.app/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        const userData = response.data;
        setUser(userData);
        setValue("name", userData.name);
        setValue("email", userData.email);
        setValue("phone_number", userData.phone_number);
        setValue("address", userData.address);
      })
      .catch((error) => {
        console.error("Error fetching user detail:", error);
      });
  }, []);

  const onSubmit = (data: any) => {
    axios
      .post("https://shopping-react-sjvr.vercel.app/profile", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((_response) => {
        console.log("User data updated successfully");
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
    setSuccessMessage("Thông tin của bạn đã được cập nhật thành công!");
  };
  return (
    <div className="rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20">
      <div className="border-b border-b-gray-200 py-6">
        <h1 className="text-lg font-medium capitalize text-gray-900">
          Hồ Sơ Của Tôi.
        </h1>
        <div className="mt-1 text-sm text-gray-700">
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </div>
      </div>
      <form
        className="mt-8 flex flex-col-reverse md:flex-row md:items-start"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mt-6 flex-grow md:mt-0 md:pr-12">
          <div className="flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
              Email
            </div>
            <div className="sm:w-[80%] sm:pl-5">
              <div className="pt-3 text-gray-700">{user && user.email}</div>
            </div>
          </div>
          <div className="mt-6 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
              Tên
            </div>

            <div className="sm:w-[80%] sm:pl-5">
              <div>
                <div className="false py-1 default-input">
                  <Input
                    type="text"
                    placeholder={user?.name || ""}
                    {...register("name", { required: true })}
                  />
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
                  <Input
                    type="text"
                    placeholder={user?.phone || ""}
                    {...register("phone", { required: true })}
                  />
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
                  <Input
                    type="text"
                    placeholder={user?.address || ""}
                    {...register("address", { required: true })}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
            <div className="flex justify-end truncate pt-3 capitalize sm:w-[33%] sm:text-right">
              <button
                type="submit"
                className=" outline-none transition duration-300 bg-primary text-white flex items-center space-x-2 rounded-md px-4 py-2 hover:bg-opacity-80 px-5 bg-orange"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      </form>
      <div>{successMessage}</div>
    </div>
  );
}
