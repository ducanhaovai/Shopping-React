import React from "react";

interface Props {
  type: React.HTMLInputTypeAttribute;
  errorMessage?: string;
  placeholder?: string;
  className?: string;
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  required?: boolean;
  autoComplete?: string;
}
const Input = ({
  name,
  type,
  placeholder,
  className,
  onChange,
  autoFocus,
  required,
}: Props) => {
  return (
    <div className={className}>
      <input
        className="p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        autoFocus={autoFocus}
      />
    </div>
  );
};

export default Input;
