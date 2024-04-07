import { useState } from "react";
import { useForm } from "react-hook-form";
import PasswordInput from "./components/PasswordInput";
import { changeUserPassword } from "../../api/profileApi";
import { useTranslation } from "react-i18next";

export default function ChangePass() {
  const { t } = useTranslation();
  const [message] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const { oldPassword, newPassword } = data;
      await changeUserPassword(oldPassword, newPassword);
      alert(t("passwordUpdatedSuccessfully"));
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Incorrect old password") {
          alert(t("changePass.incorrectOldPassword"));
        } else {
          alert(t("changePass.errorChangingPassword") + error.message);
        }
      }
    }
  };

  const newPassword = watch("newPassword", "");
  return (
    <div className="rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20">
      <div className="border-b border-b-gray-200 py-6">
        <h1 className="text-lg font-medium capitalize text-gray-900">
          {t("changePass.changePassword")}
        </h1>
        <div className="mt-1 text-sm text-gray-700">{t("manageProfile")}</div>
      </div>
      <form
        className="mr-auto mt-8 max-w-2xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mt-6 flex-grow md:mt-0 md:pr-12">
          <PasswordInput
            label={t("changePass.oldPassword")}
            placeholder={t("oldPassword")}
            register={register("oldPassword", {
              required: {
                value: true,
                message: t("changePass.oldPasswordRequired"),
              },
            })}
            error={errors.oldPassword}
          />
          <PasswordInput
            label={t("changePass.newPassword")}
            placeholder={t("changePass.newPassword")}
            register={register("newPassword", {
              required: {
                value: true,
                message: t("changePass.newPasswordRequired"),
              },
              minLength: {
                value: 8,
                message: t("newPasswordMinLength"),
              },
            })}
            error={errors.newPassword}
          />
          <PasswordInput
            label={t("changePass.confirmPassword")}
            placeholder={t("changePass.confirmPassword")}
            register={register("changePass.confirmPassword", {
              required: {
                value: true,
                message: t("changePass.confirmPasswordRequired"),
              },
              validate: (value) =>
                value === newPassword || t("changePass.passwordsDoNotMatch"),
            })}
            error={errors.confirmPassword}
          />
          <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
            <div className="sm:w-[80%] sm:pl-5">
              <button
                className="flex h-9 items-center rounded-sm bg-orange px-5 text-center text-sm text-white hover:bg-orange/80"
                type="submit"
              >
                <span>{t("changePass.save")}</span>
              </button>
            </div>
          </div>
          {message && <p>{message}</p>}
        </div>
      </form>
    </div>
  );
}
