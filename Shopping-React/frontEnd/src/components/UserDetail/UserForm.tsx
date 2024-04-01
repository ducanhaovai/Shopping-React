import { useEffect, useState } from "react";
import Input from "../Input";
import { useForm } from "react-hook-form";

import { useTranslation } from "react-i18next";
import { fetchUserProfile, updateUserProfile } from "../../api/profileApi";
import Loading from "../Loading";

export default function UserForm() {
  const [user, setUser] = useState<{
    _id?: any;
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
  } | null>(null);
  const { t } = useTranslation();

  const { register, handleSubmit, setValue } = useForm();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile()
      .then((userData) => {
        setUser(userData);
        setValue("name", userData.name || "");
        setValue("email", userData.email || "");
        setValue("phone", userData.phone || "");
        setValue("address", userData.address || "");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user detail:", error);
        setErrorMessage("Failed to fetch user data");
        setLoading(false);
      });
  }, []);

  const onSubmit = (data: any) => {
    data._id = user?._id;
    setLoading(true);
    updateUserProfile(data)
      .then(() => {
        console.log("User data updated successfully");
        setSuccessMessage("Thông tin của bạn đã được cập nhật thành công!");
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20">
      <div className="border-b border-b-gray-200 py-6">
        <h1 className="text-lg font-medium capitalize text-gray-900">
          {t("profile.My profile")}
        </h1>
        <div className="mt-1 text-sm text-gray-700">{t("profile.Detail")}</div>
      </div>
      {loading ? ( // Hiển thị loading nếu loading là true
        <Loading />
      ) : (
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
                {t("profile.Name")}
              </div>

              <div className="sm:w-[80%] sm:pl-5">
                <div>
                  <div className="false py-1 default-input">
                    <input type="hidden" name="_id" value={user?._id || ""} />

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
                {t("profile.PhoneNumber")}
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
                {t("profile.Address")}
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
                  {t("profile.Save")}
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
      {successMessage && <div className="text-green-600">{successMessage}</div>}
      {errorMessage && <div className="text-red-600">{errorMessage}</div>}
    </div>
  );
}
