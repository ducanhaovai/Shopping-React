// PasswordInput.tsx

import React from "react";

interface PasswordInputProps {
  label: string;
  placeholder: string;
  register: any;
  error?: any;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  placeholder,
  register,
  error,
}) => {
  return (
    <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
      <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
        {label}
      </div>
      <div className="sm:w-[80%] sm:pl-5">
        <div className="relative">
          <input
            className={`w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm ${
              error ? "border-red-500" : ""
            }`}
            {...register}
            type="password"
            placeholder={placeholder}
          />
          {error && (
            <div className="absolute top-full left-0 text-red-500 text-sm">
              {error.message}
            </div>
          )}
        </div>
        <div className="mt-1 text-red-600 min-h-[1.25rem] text-sm"></div>
      </div>
    </div>
  );
};

export default PasswordInput;
